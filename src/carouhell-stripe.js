;carouhell=(f => (u,d,s,b,g,c,C,D,a) => { f(u)
	d=document
	if(s=u.dataset.stripe) s=d.getElementById(s);else return;
	b=u.stripeGenerator||(_=>d.createElement("b"))
	C="children"
	a="active"
	u.fst = u[C][0]
	c= _=>[...u[C]]
	u.shiftTo= i=>{i%=u[C].length; while(u[C][i]!=u.fst) u.appendChild(u[C][0])}
	g= _=> {s.innerHTML=""; c().forEach((L,i)=> s.appendChild(b(L,i)))}
	g()
	s[C][0].classList.add(a)
	D=u[C].length
	new MutationObserver(M=> {
		if(D!=u[C].length) {g(); D=u[C].length}
		if(!M.removedNodes) c().forEach((L,i,_) => {
		_=s[C][i].classList; L==u.fst? _.add(a):_.remove(a)
		if(_=u.stripeShifted) _(i)
	})
	}).observe(u,{childList:1})
})(carouhell);