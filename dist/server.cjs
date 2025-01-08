"use strict";const d=require("express"),N=require("cookie-parser"),B=require("dotenv"),f=require("node:crypto"),P=require("jsonwebtoken"),b=require("jwt-decode"),v=require("swagger-ui-express"),L=require("swagger-jsdoc"),l=require("zod"),_=require("node:util"),u=require("sequelize");B.config();const q={url:process.env.SERVER_URL||`http://localhost:${process.env.PORT||3e3}`,host:process.env.HOST||"0.0.0.0",port:process.env.PORT||3e3,secure:process.env.SECURE||!1},z={dialect:process.env.DATABASE_DIALECT||"postgres",database:process.env.DATABASE_DBNAME,user:process.env.DATABASE_USER,password:process.env.DATABASE_PASSWORD,host:process.env.DATABASE_HOST,port:process.env.DATABASE_PORT,ssl:process.env.DATABASE_SSL||!1},x={accessToken:{type:process.env.ACCESS_TOKEN_TYPE||"Bearer",algorithm:process.env.ACCESS_TOKEN_ALGORITHM||"HS256",secret:process.env.ACCESS_TOKEN_SECRET||"Acc3ssTok3nS3c3t!",expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN_MS||60*60*1e3,audience:process.env.ACCESS_TOKEN_AUDIENCE||"my_backend_api",issuer:process.env.ACCESS_TOKEN_ISSUER||"my_authentication_server"},crypto:{scrypt:{saltLength:process.env.SCRYPT_SALT_LENGTH||16,hashLength:process.env.SCRYPT_HASH_LENGTH||64,cost:process.env.SCRYPT_COST||Math.pow(2,17),blockSize:process.env.SCRYPT_BLOCK_SIZE||8,parallelization:process.env.SCRYPT_PARALLELIZATION||1,maxmem:process.env.SCRYPT_MAXMEM|134220800},unsaltedHashAlgorithm:process.env.FAST_HASH_ALGORITHM||"sha256"}},g={auth:x,database:z,server:q},{algorithm:j,audience:M,expiresIn:m,issuer:U,secret:C,type:H}=g.auth.accessToken;function $(s){const e={id:s.id,username:s.username};return{accessToken:{token:G(e),type:H,expiresAt:Y(m),expiresInMS:m}}}function G(s){return P.sign(s,C,{algorithm:j,audience:M,expiresIn:m,issuer:U})}function K(s){try{return P.verify(s,C,{algorithms:j})}catch(e){return console.error(e),null}}function Y(s){return new Date(new Date().valueOf()+s)}async function J(s){const e=_.promisify(f.scrypt),{saltLength:t,hashLength:o,cost:n,blockSize:a,parallelization:c,maxmem:i}=g.auth.crypto.scrypt,p=f.randomBytes(t).toString("hex");return`${(await e(s,p,o,{cost:n,blockSize:a,parallelization:c,maxmem:i})).toString("hex")}.${p}`}async function W(s,e){const[t,o]=e.split("."),n=Buffer.from(t,"hex"),a=_.promisify(f.scrypt),{hashLength:c,cost:i,blockSize:p,parallelization:h,maxmem:D}=g.auth.crypto.scrypt,I=await a(s,o,c,{cost:i,blockSize:p,parallelization:h,maxmem:D});return f.timingSafeEqual(n,I)}const{dialect:X,database:Z,user:F,password:V,host:Q,port:ee}=g.database,R=new u.Sequelize({dialect:X,database:Z,username:F,password:V,host:Q,port:ee,ssl:!1,clientMinMessages:"notice"});class T extends u.Model{}T.init({username:{type:u.DataTypes.STRING},email:{type:u.DataTypes.STRING,unique:!0},password:{type:u.DataTypes.STRING}},{sequelize:R,timestamps:!0});class y{static async signupUser(e,t){const{data:o,error:n}=await this.buildSignupBodySchema().safeParseAsync(e.body);if(n)return t.status(400).json({status:400,message:n.message});const{username:a,email:c,password:i}=o;if(await T.count({where:{email:c}})!==0)return t.status(409).json({status:409,message:"Provided email already in use"});await T.create({username:a,email:c,password:await J(i)}),t.status(201).json({status:201,message:"User successfully created"})}static async loginUser(e,t){const{data:o,error:n}=await buildLoginBodySchema().safeParseAsync(e.body);if(n)return t.status(400).json({status:400,message:n.message});const{email:a,password:c}=o,i=await T.findOne({where:{email:a}});if(!i)return t.status(401).json({status:401,message:"Bad credentials"});if(!await W(c,i.password))return t.status(401).json({status:401,message:"Bad credentials"});const{accessToken:h}=$(i);console.log("CSRF TOKEN GENERE PENDANT LA CONNEXION"),console.log(h),this.sendTokensResponse(t,{user:i,accessToken:h})}static async logout(e,t){t.status(204).json({status:204,message:"Successfully logged out"})}buildSignupBodySchema(){return l.z.object({username:l.z.string().min(1),email:l.z.string().min(1).email(),password:l.z.string().min(8)})}buildLoginBodySchema(){return l.z.object({email:l.z.string().email(),password:l.z.string()})}sendTokensResponse(e,{user:t,accessToken:o,refreshToken:n,csrfToken:a}){e.json({username:t.username,accessToken:o.token,accessTokenType:o.type,accessTokenExpiresAt:o.expiresAt})}}const S=d();S.post("/signup",y.signupUser);S.post("/login",y.loginUser);S.delete("/logout",y.logout);class A extends u.Model{}A.init({name:{type:u.DataTypes.STRING},description:{type:u.DataTypes.STRING},image:{type:u.DataTypes.STRING}},{sequelize:R});class O{static async getAllProjects(e,t){try{const o=await A.findAll();t.status(200).json(o)}catch(o){console.error("Error fetching projects:",o),t.status(500).json({error:"An error occurred while fetching projects."})}}static async getProjectById(e,t){const{id:o}=e.params;try{const n=await A.findByPk(o);if(!n)return t.status(404).json({error:"Project not found."});t.status(200).json(n)}catch(n){console.error(`Error fetching project with ID ${o}:`,n),t.status(500).json({error:"An error occurred while fetching the project."})}}}const E=d();E.get("/",O.getAllProjects);E.get("/:id",O.getProjectById);typeof PhusionPassenger<"u"&&PhusionPassenger.configure({autoInstall:!1});const r=d();r.use("/",d.static("client"));const{url:w}=g.server,se={swaggerDefinition:{openapi:"3.0.0",info:{title:"API Documentation",version:"1.0.0",description:"Documentation interactive pour mon API"},servers:[{url:w,description:`API Serveur - ${w}`}]},apis:["./src/routes/*.js"]},te=L(se);r.use("/api-docs",v.serve,v.setup(te));r.use(d.urlencoded({extended:!0}));r.use(d.json());r.use((s,e,t)=>{e.header("Access-Control-Allow-Origin",["http://localhost:5173","https://backend.lafibredudev.com"]),e.header("Access-Control-Allow-Headers","Content-Type, Accept, Authorization"),e.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE"),e.header("Access-Control-Allow-Credentials",!0),s.method==="OPTIONS"?e.sendStatus(200):t()});r.use(N());r.use("/",S);r.use("/projects",E);r.get("/public-stuff",oe);r.get("/private-stuff",k,ne);r.get("/profile",k,re);if(typeof PhusionPassenger<"u")r.listen("passenger");else{const{port:s,host:e}=g.server;r.listen(s,e,()=>{console.log(`🚀 Server listening on http://${e}:${s}`)})}function k(s,e,t){var a,c;console.log("Traitement de la requête en cours ...");const o=(c=(a=s.headers)==null?void 0:a.authorization)==null?void 0:c.split("Bearer ")[1];if(!o)return e.status(401).json({status:401,message:"No access token provided in request headers"});if(console.log("Vérification du token en cours ..."),!K(o))return e.status(401).json({status:401,message:"Invalid access token"});console.log("Requete acceptée (JWT TOKEN)"),s.accessToken=o,t()}function oe(s,e){e.json({status:200,message:"This is some public resource."})}function ne(s,e){console.log(`JWT récupéré depuis la requête : ${s.accessToken}`),console.log(`Récupération de l'id : ${b.jwtDecode(s.accessToken).id}`),e.status(200).json({status:200,message:"This is some private resource"})}function re(s,e){const t={address:{lastname:"DARK",firstname:"Enzo",streetAddress:"1 rue du fleuve",postCode:"57000",city:"METZ"}};e.status(200).json({status:200,data:t})}
