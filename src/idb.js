const IDB = new function(V) {
	let T = this, u,
	YN = (o,Y,N) => {
		if(Y) o.onsuccess = _=> Y(o.result)
		if(N) o.onerror = _=> N(o.error)
	},
	arr = o => Array.isArray(o),
	err = (fn,e,p) => T.sentinel({source: "IDB."+fn, message: e.message||e.target.error, params: p}),
	db = null, P = Object.defineProperty
  P(T,"db",{get: _=>db})
	P(T,"dbPromise",{get: _=>DB.then(_=>Close).then(_=>db)})

	T.promise = O => new Promise((Y,N) => YN(O,Y,N))
	T.sentinel = console.error
	T.version = _=> indexedDB.databases()
		.then(DL => DL.forEach(D => D.name=="IDB" && (V=D.version)))
	  .then(_=> V=V||parseInt(Math.random()*1e7)+1)

// upgrade
	handlers = O => ["abort","close","error","blocked"].forEach(n => (O["on"+n] = e => err(n,e))),
  DB = new Promise(Y => T.version()
		.then(V => indexedDB.open("IDB",V))
		.then(O => O.onsuccess = _=> handlers(O)||Y(db=O.result))
	)

	let Up,Dn,Close,
	reopen = _=> Up || (Up=Dn=1, db.close(), Close=reopen1()),
	reopen1 = _=> new Promise(Y => T.version().then(V => {
		let O = indexedDB.open("IDB",++V)
  	handlers(O)
		O.onupgradeneeded = _=> {
			Object.entries(UE).forEach(i => {
				try {i[1].forEach(j => U[i[0]].apply(O.result,[O.transaction,...j]))}
				catch(e) {err(i[0],e,i[1].slice(1))}
			}); UE = {}
			Up=0; if(!Dn) Y()
		}
		O.onsuccess = _=> {
			DB=Promise.resolve(db=O.result)
			Dn=0; if(!Up) Y()
		}
	}))

// upgrade fns
	let U = {},
	iname = n => arr(n) ? n.join("_") : n
	U.upgrade = function(tx,Y) {Y()}
	U.storeCreate = function(tx,Y,name,indices,force) {
		if(this.objectStoreNames.contains(name)) force ? this.deleteObjectStore(name) : Y()
		if(!indices) indices = [u]
		let pk = indices.shift(),
		store = this.createObjectStore(name, pk ? {keyPath: pk} : {autoIncrement: true})
		indices.forEach(name => store.createIndex(arr(name)?name.join("_"):name, name))
		Y(store)
	}
	U.storeDelete = function(tx,Y,name) {
		let x = this.objectStoreNames.contains(name)
		x && this.deleteObjectStore(name)
		Y(x)
	}
	U.indexCreate = function(tx,Y,store,index,params) {
		Y(tx.objectStore(store).createIndex(iname(index),index,params))
	}
	U.indexDelete = function(tx,Y,store,index) {
		let R = this.objectStore(store),
		x = R.indexNames.contains(index)
		x && R.deleteIndex(iname(index))
		return Y(x)
	}

	let UE = {}
	Object.entries(U).forEach(i => {
		let k = i[0]
		T[k] = function() { return new Promise(Y => {
			if(!UE[k]) UE[k] = []
			UE[k].push([Y,...arguments])
			if(Object.keys(UE).length==1) DB.then(reopen)
		})}
	})

// any phase fns
	let D = {},
	S1 = (src,name,w) => src.transaction(name, w?"readwrite":u),
	S2 = (src,name,w) => S1(src,name,w).objectStore(name)
	D.store = function(name,write) {return S2(this,name,write)}
	D.stores = function() {return this.objectStoreNames}
	D.index = function(store,name) {return S2(this,store).index(name)}
	D.indices = function(store) {return S2(this,store).indexNames}
	D.transaction = function(stores,write) {return S1(this,stores,write)}

	Object.keys(D).forEach(k => T[k] = function() {
		var args = [...arguments]
		if(args[0]===true) {
			args.shift()
			return T.dbPromise
				.then(_=> D[k].apply(db,args))
				.catch(e=>(err(k,e,args)))
		}
		else {
			if(db===null) return T.sentinel(new Event("notready"))
			try {return D[k].apply(db, args)}
			catch(e) {err(k,e,args)}
		}
	});

// edit fns
	let E = {},
	sert = (store, data, pk, fn) => new Promise((Y,N) => {
		if(!data) return Y(0)
		if(!arr(data)) data = [data]
		let recs = 0, total = data.length, efn = {add: "insert", put: "update"}
		data.forEach((rec,R) => {
			R = store[fn](rec, pk)
			R.onsuccess = _=> (++recs==total)&&Y(recs)
			R.onerror = e=> N(err(efn[fn],e,[rec,pk]))
		})
	}),
	updel = function(store, index, range, itor, fn) {
		var recs = 0
		if(typeof index == "function") {itor = index; index = range = u}
		else if(typeof range == "function") {itor = range; range = u}
		return (index ? store.index(index) : Promise.resolve(S))
			.then(I => I.openCursor(range))
			.then(C => new Promise((Y,N) => {
				C.onsuccess = (e,c) => {
					(c=e.target.result) && itor(c.value) && (recs++) && c[fn](c.value)
					c ? c.continue() : Y(recs)
				}
			}))
	  	.catch(e=>err(fn,e,arguments))
	}
	E.insert = function(data, pk) {return sert(this, data, pk, "add")}
	E.upsert = function(data, pk) {return sert(this, data, pk, "put")}
	E.clear = function() { return T.promise(this.clear()) }
	E.count = function(index) { return (index ? this.index(index) : Promise.resolve(this))
		.then(I => I.count())
		.then(R => T.promise(R))
	}
	E.update = function(index, range, itor) {return updel(this, index, range, itor, "update")}
	E.delete = function(index, range, itor) {return updel(this, index, range, itor, "delete")}
	E.deleteOne = function(pk) { return T.promise(this.delete(pk)) }

	Object.keys(E).forEach(k => T[k] = function() {
		var args = [...arguments], S = (args[0] instanceof IDBTransaction) ?
			Promise.resolve(args.shift().objectStore(args.shift())) : T.store(true,args.shift(),1)
		return S.then(S => E[k].apply(S,args)).catch(e=>err(k,e,args))
	})

// read fns
	T.range = (fn1, arg1, fn2, arg2) => {
		if(!fn1) return;
		var fn, args = [],
		e = s => s[2]!="e",
		f = (s1,s2) => s1.substr(0,2)==s2
		if(fn1=="eq") (fn="only",args=[arg1])
		else if(f(fn1,"gt")) {
			if(!fn2) (fn="lowerBound",args=[arg1,e(fn1)])
			else if(f(fn2,"lt")) (fn="bound",args=[arg1,arg2,e(fn1),e(fn2)])
		}
		else if(f(fn1,"lt")) (fn="upperBound",args=[arg1,e(fn1)])
		return IDBKeyRange[fn].apply(null,args)
	}
	let cursor = function(store, index, range, dir) {
		if(typeof range == "string") {dir = range; range = u}
		if(!dir) dir = "next"
		return this
			.then(tx=> tx.objectStore(store))
			.then(S => index ? S.index(index) : S)
			.then(I => I.openCursor(range,dir))
	}
	T.cursor = function(store) {
		var args = [...arguments], tx
		return new Promise(Y => {
			if(store instanceof IDBTransaction) tx = Promise.resolve(args.shift())
			else tx = DB.then(db => db.transaction(store, "readonly"))
			Y(cursor.apply(tx, args))
		}).catch(e=>err("cursor",e,arguments))
	}
	let walk = (F,c,tx,Y) => (c && F(c.value, c.primaryKey, tx), c ? c.continue() : Y())
  T.walk = F => R => new Promise((Y,N) => {
		if(!R) return N()
		R.onsuccess = e => walk(F,e.target.result,R.transaction,Y)
		YN(R,0,N)
	});
	T.filter = F => R => new Promise((Y,N) => {
		var res = []
		if(!F) F = _=> 1
		R.onsuccess = (e,c) => {
			(c=e.target.result) && F(c.value, c.primaryKey, R.transaction) && res.push(c.value)
			c ? c.continue() : Y(res)
		}
		YN(R,0,N)
	});
	T.record = (store, pk) => T.store(true,store)
		.then(S => S.get(pk))
    .then(R => T.promise(R))
		.catch(e=>err("record",e,[store,pk]))
}