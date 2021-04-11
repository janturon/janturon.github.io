const XHR = (server, get, post, Pfn, Efn) => new Promise((Yes,No) => { let
	E = encodeURIComponent,
	P = o => Object.keys(o).map(k => E(k)+'='+E(o[k])).join('&'),
  O = s => e => Pfn(e.loaded, e.total, s)
	X = new XMLHttpRequest()
	X.onload = _=> Yes({response:X.response, headers:X.getAllResponseHeaders())
	X.onerror = No
	Pfn && (X.onprogress=O(0), X.upload.onprogress=O(1))
	if(typeof get =="object" && get!==null) get = P(get)
	if(typeof post=="object" &&post!==null) post= P(post)
	if(get) server+= "?"+get
	X.open(post?"POST":"GET", server)
	if(post) X.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	if(Efn) X = Efn(X)
	X.send(post)
})