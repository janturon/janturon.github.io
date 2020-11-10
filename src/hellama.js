hellama=((D,f,r)=>(O,T,C,S)=>[...O][f]((E,I,a,o,n,g)=>{
if(E.nodeType==1&&(I=E.getAttribute(a='data-foreach'))){
	E[r](a);a=E.cloneNode(1);E.innerHTML=""
	T[I][f](i=>hellama(a.cloneNode(1).childNodes,i,C,E))
}
(I=E.attributes||[{name:'X',value:E.nodeValue}])&&[...I][f](A=>
(a=A.value)&&(n=A.name)&&(o=_=>a.indexOf(C.open)<0)&&!o()&&(
	Object.keys(T)[f](i=>a.indexOf(d=C.open+i+C.close)>-1&&(g=T[i])!==null&&(a=a.replace(new RegExp(d,'g'),
	typeof g=='function'?g(E,A,i):g))),
	n=='X'?(E.nodeValue=a):o()?E.setAttribute(n,a):E[r](n), n=='data-if'&&(o()?E[r](n):E.remove())
));
hellama(E.childNodes,T,C)
if(S)S.appendChild(E)
}))(document,"forEach","removeAttribute")