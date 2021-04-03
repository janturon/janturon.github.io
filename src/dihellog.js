((O,P,S,M,E,R,D,e) => (
closeable=E=>(e=E[R](".close"))&&(e.onclick=_=>E.remove()),
draggable=X=>{
	var L,T,W,H,I,J,U,V,B=(v,l,u)=>v>u?u:v<l?l:v,C=X.parentNode,
	A="add"+E,r="remove"+E,L=O+"Left",T=O+"Top",W=O+"Width",H=O+"Height",H=X[R](".title"),
	MM=e=>{X[S].left=`${B(e.clientX-I,C[L],U)}px`;X[S].top=`${B(e.clientY-J,C[T],V)}px`},
	MU=e=>{D.D=X;D[r](M+'move',MM);D[r](M+'up',MU)}
	H&H[A]('dragstart',e=>e[P]())
	H&H[A](M+'down',e=>{e[P]();I=e.clientX-X[L];J=e.clientY-X[T];U=C[W]-X[W];V=C[H]-X[H]
		D.D&&(D.D[S].zIndex=0);X[S].zIndex=1;D[A](M+'move',MM);D[A](M+'up',MU)
	})
}))("offset","preventDefault","style","mouse","EventListener","querySelector",document)