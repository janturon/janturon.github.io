const XHR = (server, get, post, progress) => new Promise((resolve,reject) => { let
	E = encodeURIComponent,
	P = obj => Object.keys(obj).map(key => E(key) + '=' + E(obj[key])).join('&'),
	O = "object",
	X = new XMLHttpRequest()
	X.onload = _ => resolve(X.response, X.getAllResponseHeaders())
	X.onerror = reject
	if(progress) X.onprogress = e => progress(e.loaded, e.total)
	if(typeof get ==O && get!==null) get = P(get)
	if(typeof post==O &&post!==null) post= P(post)
	if(get) server+= "?"+get
	X.open(post?"POST":"GET", server)
	if(post) X.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	X.withCredentials = 1
	X.send(post)
})