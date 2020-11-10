function xmp2code(xmp, tgt) {
	tgt.innerHTML = xmp.innerHTML;
	var scripts = tgt.getElementsByTagName("script");
	[...scripts].forEach(s => {
		var el = document.createElement("script");
		if(s.src) el.src = s.src;
		else el.innerHTML = s.innerText;
		document.body.appendChild(el);
	});
}

function xmp2apply(_src, _cfg, _dst) {
	var el2 = document.createElement("div");
	el2.style.cssText = "position: absolute; opacity: 0; z-index: -1";
	el2.innerHTML = _src.innerHTML;
  document.body.appendChild(el2);
	var el1 = document.createElement("script");
	el1.innerHTML = _cfg.innerHTML;
	document.body.appendChild(el1);
	_dst.innerHTML = el2.innerHTML;
}