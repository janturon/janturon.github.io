(function(C,P,Q,N) {C=carouhell
carouhell=function(u,_,x) {C(u)
x="children"
u.effectStart= L=> (_=u[x][0]).style.marginLeft=-_.offsetWidth+"px"
u.effectEnd= L=> u[x][0].style.marginLeft=0
u.left= _=>{
	if(u[x].length<2)return
	u.effectStart(1)
	setTimeout(_=>{u.appendChild(ul[x][0]);e.effectEnd(1)},u.trans)
}
u.right= T=>{
	if(u[x].length<2)return
	T="transitionDuration"
	var li=u.lastElementChild
	li.style[T]=0
	u.effectStart(0)
	u.insertBefore(li,u[x][0])
	setTimeout(_=>{li.style[T]=u.trans+"ms";u.effectEnd(0)},50)
}
N= _=>_
P= u.play;u.onPlay=N;u.play= _=>{u.onPlay();P()}
Q= u.pause;u.onPause=N;u.pause= _=>{u.onPause();Q()}
}
})();