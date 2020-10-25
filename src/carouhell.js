;((d,a,C,c,I)=>{
c=window[C]=(u,k,S,T,D)=>{k="children";T=setTimeout;S=u.dataset;D=S.stay||4e3
	u.left=L=>u[k].length>1&&
		((L=u[k][0]).style.marginLeft=-L.offsetWidth+"px")&&
		T(_=>{u.appendChild(L);L.style.marginLeft=0},D)
	if(!S.paused)u.t=setInterval(u.left,D)
	if(S.hoverPause)u[a]("mouseover",_=>clearInterval(u.t))
	;(function(){T(_=>eval(S.load))}).call(u)
}
I=_=>{[...d.getElementsByClassName(C)].forEach(c)
	new MutationObserver(M=>M.forEach(m=>
		m.addedNodes.forEach(n=>(_=n.classList)&&_.contains(C)?c(n):0)
	)).observe(d,{subtree:1,childList:1})
}
d.readyState=="loading"?_=>d[a]("DOMContentLoaded",I):I()
})(document,"addEventListener","carouhell");