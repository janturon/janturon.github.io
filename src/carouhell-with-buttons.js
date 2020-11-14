((D,C,P,O,N,M,U,K,S)=>{this[C]=u=>{K=u.children;S=u.dataset;u[P].add(C)
	u.left=L=>u[P].contains(C)&&K[1]&&(
		(L=K[0]).style[M]=-u[O]+"px",
		L[N]=_=>{L[N]=0;for(U=u[O]/L[O];U-->=1;)u.appendChild(K[0]);L.style[M]=0}
	)
	u.play=_=>(u.t=setInterval(u.left,S.stay||4e3))
	setTimeout((function(X){eval(X)}).bind(u,S.load||"this.play()"))
}
U=_=>setTimeout(c=>{c=this[C]
for(_ of D.getElementsByClassName(C))c(_)
new MutationObserver(M=>M.forEach(m=>m.addedNodes.forEach(n=>(_=n[P])&&_.contains(C)&&c(n))
)).observe(D,{subtree:1,childList:1})
})
D.readyState[0]=="l"?addEventListener("load",U):U()
})(document,"carouhell","classList","offsetWidth","ontransitionend","marginLeft")

carouhell=((f,O,M,T)=>(u,s,K,b,_)=>{f(u);s=u.dataset;K=u.children
	u.right=L=>{if(u.classList.contains("carouhell")&&K.length>1)for(_=u[O]/K[0][O];_-->=1;){
		L=K[K.length-1];(f=L.style)[T]="0s";L.focus()
		f[M]=-u[O]+"px";u.insertBefore(L,K[0]);f[T]="";L.focus()
		f[M]=""
	}}
	u.pause=_=>clearTimeout(u.t)
	u.play=x=>{u.t=setTimeout(_=>{s.dir==="0"?_=>_:s.dir>0?u.right():u.left();u.play(x)},x||s.stay||4e3)}
	b=(i,f,n)=>document.getElementById(i).addEventListener("click",_=>f()||n||u.pause())
	if(_=s.left)b(_,u.left)
	if(_=s.right)b(_,u.right)
	if(_=s.play)b(_,u.play,1)
	if(_=s.pause)b(_,_=>_)
})(carouhell,"offsetWidth","marginLeft","transition")