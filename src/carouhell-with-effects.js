((D,C,P,O,N,M,F,U,K,S)=>{this[C]=u=>{K=u.children;S=u.dataset;u[P].add(C)
	u.left=L=>u[P].contains(C)&&K[1]&&((L=K[0]).style[M]=-u[O]+"px",L[N]=_=>{L[N]=0;for(U=u[O]/L[O];U-->=1;)u.appendChild(K[0]);L.style[M]=0})
	u.play=_=>(u.t=setInterval(u.left,S.stay||4e3))
	setTimeout((function(X){eval(X)}).bind(u,S.load||"this.play()"))
}
U=_=>setTimeout(c=>{c=this[C];[...D.getElementsByClassName(C)][F](c)
	new MutationObserver(M=>M[F](m=>m.addedNodes[F](n=>(_=n[P])&&_.contains(C)&&c(n)))).observe(D,{subtree:1,childList:1})
})
D.readyState[0]=="l"?addEventListener("load",U):U()
})(document,"carouhell","classList","offsetWidth","ontransitionend","marginLeft","forEach")

carouhell=((f,T,W)=>(u,C,D,g)=>{f(u);C=u.children
	D=document.createElement("div");D.className="css";D.style.cssText="position:absolute;z-index:-9;transition:1ms"
  u.parentNode.insertBefore(D,u.nextSibling)
	setTimeout(F=>(F=u.mediaCSS)&&(D[T]=_=>F(~~(10*getComputedStyle(D).opacity+.01)))&&D[T]())
	u.in&&
	(g=x=>U=>{U=~~(u[W]/C[0][W]);if(C[2*U-1]&&u.classList.contains("carouhell")){u.in(x);C[0][T]=_=>{C[0][T]=0
		while(U--)x>0?u.insertBefore(C[C.length-1],C[0]):u.appendChild(C[0])
		u.out?u.out(x):[...C].forEach(c=>(c.style.cssText=""))
	}}})&&
	(u.left=g(-1),u.right=g(1))
})(carouhell,"ontransitionend","offsetWidth")