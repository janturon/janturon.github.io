/**
 * IDB - IndexedDB in Promises
 * ===========================
 * License: CC BY-SA 4.0 Jan Turoň (janturon.github.io)
 * Reference: https://janturon.github.io/idbref.html
 * Compatible with all modern browsers.
 * To use store structure manipulation functions, this script needs to be loaded early.
 *
 * Published as HELL LICENSE v66.6 (6.666 bytes source code)
 * https://janturon.github.io/LICENSE.md, HELL manifesto: https://janturon.github.io/HellCode.html
 * If you keep the file size after your modification, you have my blessing. Keep the code simple.
 ************
**/
const IDB = new function(V) {
  let T = this;

  // Promises abstraction
  let YN = (o,Y,N) => {
    if(Y) o.onsuccess = _ => Y(o.result);
    if(N) o.onerror = _ => N(o.error);
  };
  T.promise = obj => new Promise((Y,N) => YN(obj,Y,N));

  // enable upgrade phase by increasing version number everytime
  var late = 0;
  if(V=localStorage.getItem("IDB_v")); else V=Math.random()*1e7;
  var db = null;
  Object.defineProperty(T, "DB", { get: _=>db });
  let DB = new Promise((Y,N,O)=> {
    late = 0;
    localStorage.setItem("IDB_v", ++V);
    O = indexedDB.open("DB",V);
    O.onupgradeneeded = _=> {
      Object.entries(UE).forEach(i =>
        i[1].forEach(j => U[i[0]].apply(O.result,j))
      );
      UE = {}; late = 1;
    }
    YN(O,null,N);
    O.onsuccess = _ => Y(db=O.result);
    O.onabort = O.onclose = O.onerror = T.sentinel;
  }).catch(_=>_);

  // store related, mostly upgrade phase functions
  let U = {};
  let iname = n => Array.isArray(n) ? n.join("_") : n;
  U.stores = function(ret) {
    ret(this.objectStoreNames);
  }
  U.storeCreate = function(ret,name,indices,force) {
    if(this.objectStoreNames.contains(name)) force ? this.deleteObjectStore(name) : ret(false);
    if(!indices) indices = [undefined];
    const pk = indices.shift();
    let store = this.createObjectStore(name, pk ? {keyPath: pk} : {autoIncrement: true});
    indices.forEach(name => store.createIndex(Array.isArray(name)?name.join("_"):name, name));
    ret(true);
  }
  U.storeDelete = function(ret,name) {
    var exists = this.objectStoreNames.contains(name);
    if(exists) this.deleteObjectStore(name);
    ret(exists);
  }
  U.indices = function(ret,store) {
    ret(T.store(store).then(req => req.indexNames));
  }
  U.indexCreate = function(ret,store,index,params) {
    ret(T.store(store,1).then(req => req.createIndex(iname(index),index,params)));
  }
  U.indexDelete = function(ret,store,index) {
    ret(T.store(store,1).then(req => {
      var ex = req.indexNames.contains(index);
      if(ex) req.deleteIndex(iname(index));
      return ex;
    }));
  }
  // Load all instantiations of these functions for execution in upgrade event
  UE = {};
  Object.entries(U).forEach(i => {
    let key = i[0];
    T[key] = function() { return new Promise((Y,N) =>
      if(!UE[key]) UE[key] = [];
      UE[key].push([Y,...arguments]);
      if(late) (db.close(),open());
    )}
  });

  // create all other functions
  let F = {};
  F.store = function(name,write) {
    return this.transaction(name, write?"readwrite":"readonly").objectStore(name);
  }
  T.getStore = (name,write) => db && db.transaction(name, trtype(write)).objectStore(name);
  T.getStores = _ => db && db.objectStoreNames;
  T.getIndex = (store,name) => db && db.getStore(store).index(name);
  T.getIndices = store => db && T.getStore(store).indexNames;
  F.sert = function(name, data, pk, fn) {
    return new Promise((Y,N) => {
      if(!data.map) data = [data];
      let store = T.store(name,1), recs = 0, total = data.length;
      data.forEach((rec,_) => store.then( req => {
        req = req[fn](rec, pk);
        req.onsuccess = _=> (++recs==total)&&Y();
        req.onerror = _=> N(req.error);
      }));
    });
  }
  F.insert = (name, data, pk) => F.sert(name, data, pk, "add");
  F.upsert = (name, data, pk) => F.sert(name, data, pk, "put");
  F.clear = function(name) {
    return new Promise((Y,N,_) => T.store(name,1).then(req => YN(req.clear(),Y,N)));
  }
  F.count = function(store, index) {
    return new Promise((Y,N,_) => T.store(store).then(req => {
      if(index) req = req.index(index);
      YN(req.count(),Y,N);
    }));
  }
  T.getRange = (fn1, arg1, fn2, arg2) => {
    if(!fn1) return;
    var fn, args = [],
    e = s => s[2]!="e",
    f = (s1,s2) => s1.substr(0,2)==s2;
    if(fn1=="eq") (fn="only",args=[arg1]);
    else if(f(fn1,"gt")) {
      if(!fn2) (fn="lowerBound",args=[arg1,e(fn1)]);
      else if(f(fn2,"lt")) (fn="bound",args=[arg1,arg2,e(fn1),e(fn2)]);
    }
    else if(f(fn1,"lt")) (fn="upperBound",args=[arg1,e(fn1)]);
    return IDBKeyRange[fn].apply(null,args);
  }
  F.cursor = function(name, index, range, dir) {
    if(typeof range == "string") {
      dir = range;
      range = undefined;
    }
    if(!dir) dir = "next";
    return new Promise((Y,N) => T.store(name).then(req => {
      if(index) req = req.index(index);
      Y(req.openCursor(range,dir));
    }));
  }
  F.updel = function(name, index, range, itor, fn) {
    if(typeof index == "function") (itor = index, index = undefined);
    else if(typeof range == "function") (itor = range, range = undefined);
    return T.store(name,1).then(req => new Promise(Y => {
      var recs = 0;
      if(index) req = req.index(index);
      req = req.openCursor(range);
      req.onsuccess = (e,c) => {
        (c=e.target.result) && itor(c.value) && (recs++) && c[fn](c.value);
        c ? c.continue() : Y(recs);
      }
    }));
  }
  F.update = (name, index, range, itor) => F.updel(name, index, range, itor, "update");
  F.delete = (name, index, range, itor) => F.updel(name, index, range, itor, "delete");
  F.deleteOne = function(name, pk) {
    return new Promise((Y,N) => T.store(name,1).then(req => YN(req.delete(pk),Y,N)));
  }
  T.walk = handler => req => req.onsuccess = (e,c) => (c=e.target.result) && handler(c.value, c.continue());
  T.filter = passer => req => new Promise(Y => {
    var data = [];
    if(!passer) passer = _ => 1;
    req.onsuccess = (e,c) => {
      (c=e.target.result) && passer(c.value) && data.push(c.value);
      c ? c.continue() : Y(data);
    }
  });
  F.record = function(name, pk) {
    return new Promise((Y,N) => T.store(name).then(req => YN(req.get(pk),Y,N)));
  }
  // call the functions in Promise after the DB is loaded
  let call = (fn,args) => DB.then(db => fn.apply(db,args));
  Object.entries(F).forEach(i => T[i[0]] = function() { return call(i[1], arguments)});
}//:-)