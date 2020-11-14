hellswipe=(O,S,s,m)=>{
var MA=Math.abs,ND=_=>new Date(),D=document,E="EventListener",R="remove"+E,A="add"+E,M="mouse",T="touch",t=T+"es",
H="move",P="preventDefault",Q="start",
x,y,X,Y,d=0,W,w,j=-1,k,J,K,
U=e=>{ if(e[t]) e=e[t][0]
	J=e.clientX;K=e.clientY
	if(w)X=Y=0
	if(w||ND()-d>S.dt) {j=J;k=K;d=ND()}
	m(O,{x:J,y:K,s:w});w=0
	if(S.dx&&MA(x=(J-j))>S.dx&&x*X<=0||S.dy&&MA(y=(K-k))>S.dy&&y*Y<=0) s(O,{x:X=x,y:Y=y})
},
V=_=>{if(j>-1){ j=-1
	if(W>1) {D[R](M+H,U);D[R](M+"up",V)}
	else {D[R](T+H,U);D[R](T+"end",V)}
}}
O[A](T+Q,e=>{e[P]();if(!e[t][1]){w=W=1;D[A](T+H,U);D[A](T+"end",V)}})
O[A](M+"down",e=>{w=W=2;D[A](M+H,U);D[A](M+"up",V)})
O[A]("drag"+Q,e=>e[P]())
}