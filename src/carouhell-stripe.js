carouhell=((f,d,a,c,k,A)=>(u,s,b,g,h,o,C,D,X,t,_)=>{f(u);C=u[c];u.i=0
o=_=>X.observe(u,{childList:1})
s=d.getElementById(u.dataset.stripe)
g=u.sItem||(_=>d.createElement("b"))
h=u.shiftTo=(n,m)=>{X.disconnect()
	for(m=1,n%=D;(m&=C[0].i>C[D-1].i)||n-->0;)u[A](C[0])
	b();o()}
f=_=>s&&(s.innerHTML="",D=C.length,[...C].forEach(
	(L,i,S)=>(L.i=i,s[A](S=g(L)),i||S[k].add(a))
));f()
b=_=>s&&((_=s[c][u.i])&&_[k].remove(a),(_=s[c][u.i=C[0].i])&&_[k].add(a))
X=new MutationObserver(M=>{clearTimeout(t);t=setTimeout(D!=C.length?f:(_=s.shift)?_():b)});o()
u.sRotate=n=>{n%=D;n=D-n;while(n--)s[A](s[c][0])}
})(carouhell,document,"active","children","classList","appendChild")