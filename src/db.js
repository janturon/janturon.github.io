const DB = new function() { let
	T=this, db=openDatabase("DB","","",5e6),
	M=(s,n) => new Array(n).fill(s).join()
	T.query=(sql,D,R) => new Promise((Y,N) => db.transaction(tx => {
		if(!R) R = (fn,p) => fn(p.rowsAffected)
		tx.executeSql(sql,D, (_,d)=>R(Y,d),	(_,e)=>(e.query=sql,e.params=D,N(e)))
	}))
	T.select=(sql,D) => T.query(sql,D, (R,data) => R([...data.rows]))
	T.selectRow=(sql,D) => T.query(sql,D, (R,data) => R(data.rows[0]))
	T.insert=(tab,K,D,_) => (!D&&(D=Object.values(K),K=Object.keys(K)), _=`(${M('?',K.length)})`, T.query(
	  `INSERT INTO ${tab} (${K.join(',')}) VALUES ${M(_,D[0].map?D.length:1)}`,
	  D.flat(), (R,data) => R(data.insertId)
	))
}