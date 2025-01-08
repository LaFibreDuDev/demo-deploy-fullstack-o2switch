"use strict";const d=require("express"),I=require("cookie-parser"),N=require("dotenv"),f=require("node:crypto"),w=require("jsonwebtoken"),b=require("jwt-decode"),v=require("swagger-ui-express"),B=require("swagger-jsdoc"),l=require("zod"),P=require("node:util"),u=require("sequelize");N.config();const q={host:process.env.HOST||"0.0.0.0",port:process.env.PORT||3e3,secure:process.env.SECURE||!1},z={dialect:process.env.DATABASE_DIALECT||"postgres",database:process.env.DATABASE_DBNAME,user:process.env.DATABASE_USER,password:process.env.DATABASE_PASSWORD,host:process.env.DATABASE_HOST,port:process.env.DATABASE_PORT,ssl:process.env.DATABASE_SSL||!1},L={accessToken:{type:process.env.ACCESS_TOKEN_TYPE||"Bearer",algorithm:process.env.ACCESS_TOKEN_ALGORITHM||"HS256",secret:process.env.ACCESS_TOKEN_SECRET||"Acc3ssTok3nS3c3t!",expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN_MS||60*60*1e3,audience:process.env.ACCESS_TOKEN_AUDIENCE||"my_backend_api",issuer:process.env.ACCESS_TOKEN_ISSUER||"my_authentication_server"},crypto:{scrypt:{saltLength:process.env.SCRYPT_SALT_LENGTH||16,hashLength:process.env.SCRYPT_HASH_LENGTH||64,cost:process.env.SCRYPT_COST||Math.pow(2,17),blockSize:process.env.SCRYPT_BLOCK_SIZE||8,parallelization:process.env.SCRYPT_PARALLELIZATION||1,maxmem:process.env.SCRYPT_MAXMEM|134220800},unsaltedHashAlgorithm:process.env.FAST_HASH_ALGORITHM||"sha256"}},h={auth:L,database:z,server:q},{algorithm:j,audience:x,expiresIn:m,issuer:M,secret:_,type:H}=h.auth.accessToken;function U(s){const e={id:s.id,username:s.username};return{accessToken:{token:G(e),type:H,expiresAt:K(m),expiresInMS:m}}}function G(s){return w.sign(s,_,{algorithm:j,audience:x,expiresIn:m,issuer:M})}function $(s){try{return w.verify(s,_,{algorithms:j})}catch(e){return console.error(e),null}}function K(s){return new Date(new Date().valueOf()+s)}async function Y(s){const e=P.promisify(f.scrypt),{saltLength:t,hashLength:o,cost:n,blockSize:a,parallelization:c,maxmem:i}=h.auth.crypto.scrypt,p=f.randomBytes(t).toString("hex");return`${(await e(s,p,o,{cost:n,blockSize:a,parallelization:c,maxmem:i})).toString("hex")}.${p}`}async function J(s,e){const[t,o]=e.split("."),n=Buffer.from(t,"hex"),a=P.promisify(f.scrypt),{hashLength:c,cost:i,blockSize:p,parallelization:g,maxmem:O}=h.auth.crypto.scrypt,R=await a(s,o,c,{cost:i,blockSize:p,parallelization:g,maxmem:O});return f.timingSafeEqual(n,R)}const{dialect:W,database:X,user:Z,password:F,host:V,port:Q}=h.database,C=new u.Sequelize({dialect:W,database:X,username:Z,password:F,host:V,port:Q,ssl:!1,clientMinMessages:"notice"});class T extends u.Model{}T.init({username:{type:u.DataTypes.STRING},email:{type:u.DataTypes.STRING,unique:!0},password:{type:u.DataTypes.STRING}},{sequelize:C,timestamps:!0});class y{static async signupUser(e,t){const{data:o,error:n}=await this.buildSignupBodySchema().safeParseAsync(e.body);if(n)return t.status(400).json({status:400,message:n.message});const{username:a,email:c,password:i}=o;if(await T.count({where:{email:c}})!==0)return t.status(409).json({status:409,message:"Provided email already in use"});await T.create({username:a,email:c,password:await Y(i)}),t.status(201).json({status:201,message:"User successfully created"})}static async loginUser(e,t){const{data:o,error:n}=await buildLoginBodySchema().safeParseAsync(e.body);if(n)return t.status(400).json({status:400,message:n.message});const{email:a,password:c}=o,i=await T.findOne({where:{email:a}});if(!i)return t.status(401).json({status:401,message:"Bad credentials"});if(!await J(c,i.password))return t.status(401).json({status:401,message:"Bad credentials"});const{accessToken:g}=U(i);console.log("CSRF TOKEN GENERE PENDANT LA CONNEXION"),console.log(g),this.sendTokensResponse(t,{user:i,accessToken:g})}static async logout(e,t){t.status(204).json({status:204,message:"Successfully logged out"})}buildSignupBodySchema(){return l.z.object({username:l.z.string().min(1),email:l.z.string().min(1).email(),password:l.z.string().min(8)})}buildLoginBodySchema(){return l.z.object({email:l.z.string().email(),password:l.z.string()})}sendTokensResponse(e,{user:t,accessToken:o,refreshToken:n,csrfToken:a}){e.json({username:t.username,accessToken:o.token,accessTokenType:o.type,accessTokenExpiresAt:o.expiresAt})}}const S=d();S.post("/signup",y.signupUser);S.post("/login",y.loginUser);S.delete("/logout",y.logout);class A extends u.Model{}A.init({name:{type:u.DataTypes.STRING},description:{type:u.DataTypes.STRING},image:{type:u.DataTypes.STRING}},{sequelize:C});class k{static async getAllProjects(e,t){try{const o=await A.findAll();t.status(200).json(o)}catch(o){console.error("Error fetching projects:",o),t.status(500).json({error:"An error occurred while fetching projects."})}}static async getProjectById(e,t){const{id:o}=e.params;try{const n=await A.findByPk(o);if(!n)return t.status(404).json({error:"Project not found."});t.status(200).json(n)}catch(n){console.error(`Error fetching project with ID ${o}:`,n),t.status(500).json({error:"An error occurred while fetching the project."})}}}const E=d();E.get("/",k.getAllProjects);E.get("/:id",k.getProjectById);typeof PhusionPassenger<"u"&&PhusionPassenger.configure({autoInstall:!1});const r=d();r.use("/",d.static("client"));const ee={swaggerDefinition:{openapi:"3.0.0",info:{title:"API Documentation",version:"1.0.0",description:"Documentation interactive pour mon API"},servers:[{url:"http://localhost:3000",description:"Serveur local"},{url:"https://backend.lafibredudev.com",description:"Serveur de production"}]},apis:["./src/routes/*.js"]},se=B(ee);r.use("/api-docs",v.serve,v.setup(se));r.use(d.urlencoded({extended:!0}));r.use(d.json());r.use((s,e,t)=>{e.header("Access-Control-Allow-Origin",["http://localhost:5173","https://backend.lafibredudev.com"]),e.header("Access-Control-Allow-Headers","Content-Type, Accept, Authorization"),e.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE"),e.header("Access-Control-Allow-Credentials",!0),s.method==="OPTIONS"?e.sendStatus(200):t()});r.use(I());r.use("/",S);r.use("/projects",E);r.get("/public-stuff",te);r.get("/private-stuff",D,oe);r.get("/profile",D,ne);if(typeof PhusionPassenger<"u")r.listen("passenger");else{const{port:s,host:e}=h.server;r.listen(s,e,()=>{console.log(`🚀 Server listening on http://${e}:${s}`)})}function D(s,e,t){var a,c;console.log("Traitement de la requête en cours ...");const o=(c=(a=s.headers)==null?void 0:a.authorization)==null?void 0:c.split("Bearer ")[1];if(!o)return e.status(401).json({status:401,message:"No access token provided in request headers"});if(console.log("Vérification du token en cours ..."),!$(o))return e.status(401).json({status:401,message:"Invalid access token"});console.log("Requete acceptée (JWT TOKEN)"),s.accessToken=o,t()}function te(s,e){e.json({status:200,message:"This is some public resource."})}function oe(s,e){console.log(`JWT récupéré depuis la requête : ${s.accessToken}`),console.log(`Récupération de l'id : ${b.jwtDecode(s.accessToken).id}`),e.status(200).json({status:200,message:"This is some private resource"})}function ne(s,e){const t={address:{lastname:"DARK",firstname:"Enzo",streetAddress:"1 rue du fleuve",postCode:"57000",city:"METZ"}};e.status(200).json({status:200,data:t})}
