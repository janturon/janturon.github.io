;carouhell = (f=>(u,s,b,T,k,D,_) => {f(u);s=u.dataset;T="transitionDuration",k="children"
	D=getComputedStyle(u[k][0]).getPropertyValue(T)
	u.right= L=>{if(u[k]length>1){
		(L=u.lastElementChild).style[T]=0
		L.style.marginLeft=-L.offsetWidth+"px"
		u.insertBefore(L, u[k][0])
		setTimeout(_=>{L.style[T]=D; L.style.marginLeft=0},50)
	}}
	u.play=x=>{u.t=setInterval(s.dir>0?u.right:u.left, x||u.dataset.stay||4e3)}
	u.pause=clearInterval(u.t)
	b=(i,f,n)=>document.getElementById(i).addEventListener("click", _=>f()||n||u.pause())
	if(_=s.left) b(_,u.left)
	if(_=s.right) b(_,u.right)
	if(_=s.play) b(_,u.play,1)
	if(_=s.pause) b(_,_=>_)
})(carouhell);