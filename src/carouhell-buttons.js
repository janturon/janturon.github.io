carouhell=(f=>(u,s,b,K,_) => {f(u);s=u.dataset;K=u.children
	u.right=L=>!u.classList.contains("carouhell")||K.length>1&&
		((L=K[K.length-1]).ontransitionend=_=>_)&&
		(L.style.cssText=`transition:0s;margin-left:${-L.offsetWidth}px`)&&
		(u.insertBefore(L,K[0]),L.focus(),L.style.cssText="")
	clearInterval(u.t)
	u.pause=_=>clearTimeout(u.t)
	u.play=x=>{u.t=setTimeout(_=>{s.dir==="0"?_=>_:s.dir>0?u.right():u.left();u.play(x)}, x||s.stay||4e3)}
	b=(i,f,n)=>document.getElementById(i).addEventListener("click", _=>f()||n||u.pause())
	if(_=s.left) b(_,u.left)
	if(_=s.right) b(_,u.right)
	if(_=s.play) b(_,u.play,1)
	if(_=s.pause) b(_,_=>_)
})(carouhell)