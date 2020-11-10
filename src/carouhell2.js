;((d,e,C)=>{
carouhell=(u,c,_)=>{c="children"
u.left=L=>{if(u[c].length<2)return;
  _ = parseInt(u.offsetWidth/(L=u[c][0]).offsetWidth);
  L.style.marginLeft=-u.offsetWidth+"px"
	L.ontransitionend=x=>{
    while(_--) { u[c][0].ontransitionend = _=>_;u.appendChild(u[c][0])}
    L.style.marginLeft=0
  }
}
	if(_=u.dataset.trans)u.t=setInterval(u.left,_)
	u[e]("mouseover",_=>clearInterval(u.t))
	;(function(){setTimeout(_=>eval(u.dataset.load))}).call(u)
}
(d)[e]("DOMContentLoaded",_=>{
Array.from(d.getElementsByClassName("carouhell")).forEach(carouhell)
new MutationObserver(M=>M.forEach(m=>
m.addedNodes.forEach(n=>{if((_=n.classList)&&_.contains("carouhell"))carouhell(n)})
)).observe(d.body,{subtree:1,childList:1})
})
})(document,"addEventListener");

#carousel-menu > ul { display: flex; justify-content: space-between; margin: 0 auto; }
  #carousel-menu li { display: flex; flex-grow: 1; height: 7em; padding: 0 1em; align-items: center; background: url('/img/blood.png') no-repeat 50%/contain; }
  #carousel-menu li:nth-child(1), #carousel-menu li:nth-child(1) a { transform: scaleX(-1); }
  #carousel-menu li:nth-child(2) { background-image: url('/img/blood2.png'); margin: 0 1em; }
  #carousel-menu a { flex-grow: 1; text-align: center; text-transform: uppercase; font-size: 2em; font-weight: bold; line-height: 80%; color: white; }

@media (max-width: 900px) {
  #carousel-list #carousel1 { flex-basis: 100%; }
  #carousel2 { display: none; }
  .carouhell+.css { opacity: 0; }
  #carousel-menu li { background-size: 100% 100%; height: 5em; }
  #carousel-menu a { font-size: 1.5em; letter-spacing: -1px; }
}
