"use strict";const t=require("express"),s=t(),e=process.env.PORT||3e3;s.get("/",(o,n)=>{n.send("Salut les gens !")});s.listen(e,()=>{console.log(`Server running on http://localhost:${e}`)});
