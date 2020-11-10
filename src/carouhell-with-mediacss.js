((d,a,C,P,U)=>{
carouhell=u=>{u[P].add(C)
	u.left=L=>!u[P].contains(C)||(L=u.children).length>1&&
	((L=L[0]).style.marginLeft=-L.offsetWidth+"px",L.ontransitionend=_=>{u.appendChild(L);L.style.marginLeft=0})
	u.play=_=>(u.t=setInterval(u.left,u.dataset.stay||4e3))
	setTimeout((function(X){eval(X)}).bind(u,u.dataset.load||"this.play()"))
}
U=_=>setTimeout(c=>{c=carouhell;[...d.getElementsByClassName(C)].forEach(c)
	new MutationObserver(M=>M.forEach(m=>m.addedNodes.forEach(n=>(_=n[P])&&_.contains(C)?c(n):0)
	)).observe(d,{subtree:1,childList:1})
})
d.readyState=="loading"&&!d[a]("DOMContentLoaded",U)||U()
})(document,"addEventListener","carouhell","classList")

carouhell=((f,d,O,g,T)=>(u,C,D)=>{f(u);C=u.children
	D=d.createElement("div")
	D.className="css"
	D.style.cssText="position:absolute;z-index:-9;transition:1ms"
  u.parentNode.insertBefore(D,u.nextSibling)
	setTimeout(F=>{
		(F=carouhell.mediaCSS)&&(D[T]=_=>F(u,g(D)[O]))
		(F=u.mediaCSS)&&(D[T]=_=>F(g(D)[O]))
	})
	u.effectStart= L=>(_=C[0]).style.marginLeft=-_.offsetWidth+"px"
	u.effectEnd= L=> C[0].style.marginLeft=0
	u.left= _=>C.length>1&&(u.effectStart(-1),
})(carouhell,document,"opacity",getComputedStyle,"ontransitionend");