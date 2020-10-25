;((d,e)=>{
carouhell=(u,c,_)=>{c="children"
	u.left=L=>{if(u[c].length<2)return;
		(L=u[c][0]).style.marginLeft=-L.offsetWidth+"px"
		setTimeout(x=>{u.appendChild(L);L.style.marginLeft=0},u.dataset.stay||4000)
	}
	if(_=u.dataset.stay)u.t=setInterval(u.left,_)
	u[e]("mouseover",_=>clearInterval(u.t))
	(function(){setTimeout(_=>eval(u.dataset.load))}).call(u)
}
(d)[e]("DOMContentLoaded",_=>{
Array.from(d.getElementsByClassName("carouhell")).forEach(carouhell)
new MutationObserver(M=>M.forEach(m=>
m.addedNodes.forEach(n=>{if((_=n.classList)&&_.contains("carouhell"))carouhell(n)})
)).observe(d.body,{subtree:1,childList:1})
})
})(document,"addEventListener");