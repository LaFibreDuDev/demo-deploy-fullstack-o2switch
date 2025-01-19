"use strict";const h=require("express"),I=require("cookie-parser"),b=require("dotenv"),f=require("node:crypto"),_=require("jsonwebtoken"),B=require("jwt-decode"),P=require("swagger-ui-express"),q=require("swagger-jsdoc"),g=require("zod"),C=require("node:util"),u=require("sequelize");b.config();const L={url:process.env.SERVER_URL||`http://localhost:${process.env.PORT||3e3}`,host:process.env.HOST||"0.0.0.0",port:process.env.PORT||3e3,secure:process.env.SECURE||!1,cors:process.env.CORS||""},z={dialect:process.env.DATABASE_DIALECT||"postgres",database:process.env.DATABASE_DBNAME,user:process.env.DATABASE_USER,password:process.env.DATABASE_PASSWORD,host:process.env.DATABASE_HOST,port:process.env.DATABASE_PORT,ssl:process.env.DATABASE_SSL||!1},x={accessToken:{type:process.env.ACCESS_TOKEN_TYPE||"Bearer",algorithm:process.env.ACCESS_TOKEN_ALGORITHM||"HS256",secret:process.env.ACCESS_TOKEN_SECRET||"Acc3ssTok3nS3c3t!",expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN_MS||60*60*1e3,audience:process.env.ACCESS_TOKEN_AUDIENCE||"my_backend_api",issuer:process.env.ACCESS_TOKEN_ISSUER||"my_authentication_server"},crypto:{scrypt:{saltLength:process.env.SCRYPT_SALT_LENGTH||16,hashLength:process.env.SCRYPT_HASH_LENGTH||64,cost:process.env.SCRYPT_COST||Math.pow(2,17),blockSize:process.env.SCRYPT_BLOCK_SIZE||8,parallelization:process.env.SCRYPT_PARALLELIZATION||1,maxmem:process.env.SCRYPT_MAXMEM|134220800},unsaltedHashAlgorithm:process.env.FAST_HASH_ALGORITHM||"sha256"}},p={auth:x,database:z,server:L},{algorithm:R,audience:M,expiresIn:y,issuer:U,secret:O,type:H}=p.auth.accessToken;function $(t){const e={id:t.id,username:t.username};return{accessToken:{token:G(e),type:H,expiresAt:Y(y),expiresInMS:y}}}function G(t){return _.sign(t,O,{algorithm:R,audience:M,expiresIn:y,issuer:U})}function K(t){try{return _.verify(t,O,{algorithms:R})}catch(e){return console.error(e),null}}function Y(t){return new Date(new Date().valueOf()+t)}async function J(t){const e=C.promisify(f.scrypt),{saltLength:s,hashLength:o,cost:r,blockSize:c,parallelization:a,maxmem:i}=p.auth.crypto.scrypt,l=f.randomBytes(s).toString("hex");return`${(await e(t,l,o,{cost:r,blockSize:c,parallelization:a,maxmem:i})).toString("hex")}.${l}`}async function W(t,e){const[s,o]=e.split("."),r=Buffer.from(s,"hex"),c=C.promisify(f.scrypt),{hashLength:a,cost:i,blockSize:l,parallelization:d,maxmem:m}=p.auth.crypto.scrypt,A=await c(t,o,a,{cost:i,blockSize:l,parallelization:d,maxmem:m});return f.timingSafeEqual(r,A)}const{dialect:X,database:Z,user:F,password:V,host:Q,port:ee}=p.database,D=new u.Sequelize({dialect:X,database:Z,username:F,password:V,host:Q,port:ee,ssl:!1,clientMinMessages:"notice"});class T extends u.Model{}T.init({username:{type:u.DataTypes.STRING},email:{type:u.DataTypes.STRING,unique:!0},password:{type:u.DataTypes.STRING}},{sequelize:D,timestamps:!0,tableName:"Users"});class v{static async signupUser(e,s){const{data:o,error:r}=await this.buildSignupBodySchema().safeParseAsync(e.body);if(r)return s.status(400).json({status:400,message:r.message});const{username:c,email:a,password:i}=o;if(await T.count({where:{email:a}})!==0)return s.status(409).json({status:409,message:"Provided email already in use"});await T.create({username:c,email:a,password:await J(i)}),s.status(201).json({status:201,message:"User successfully created"})}static async loginUser(e,s){const{data:o,error:r}=await buildLoginBodySchema().safeParseAsync(e.body);if(r)return s.status(400).json({status:400,message:r.message});const{email:c,password:a}=o,i=await T.findOne({where:{email:c}});if(!i)return s.status(401).json({status:401,message:"Bad credentials"});if(!await W(a,i.password))return s.status(401).json({status:401,message:"Bad credentials"});const{accessToken:d}=$(i);console.log("CSRF TOKEN GENERE PENDANT LA CONNEXION"),console.log(d),this.sendTokensResponse(s,{user:i,accessToken:d})}static async logout(e,s){s.status(204).json({status:204,message:"Successfully logged out"})}buildSignupBodySchema(){return g.z.object({username:g.z.string().min(1),email:g.z.string().min(1).email(),password:g.z.string().min(8)})}buildLoginBodySchema(){return g.z.object({email:g.z.string().email(),password:g.z.string()})}sendTokensResponse(e,{user:s,accessToken:o,refreshToken:r,csrfToken:c}){e.json({username:s.username,accessToken:o.token,accessTokenType:o.type,accessTokenExpiresAt:o.expiresAt})}}const S=h();S.post("/signup",v.signupUser);S.post("/login",v.loginUser);S.delete("/logout",v.logout);class E extends u.Model{}E.init({name:{type:u.DataTypes.STRING},description:{type:u.DataTypes.STRING},image:{type:u.DataTypes.STRING}},{sequelize:D,tableName:"Projects"});class N{static async getAllProjects(e,s){try{const o=await E.findAll();s.status(200).json(o)}catch(o){console.error("Error fetching projects:",o),s.status(500).json({error:"An error occurred while fetching projects."})}}static async getProjectById(e,s){const{id:o}=e.params;try{const r=await E.findByPk(o);if(!r)return s.status(404).json({error:"Project not found."});s.status(200).json(r)}catch(r){console.error(`Error fetching project with ID ${o}:`,r),s.status(500).json({error:"An error occurred while fetching the project."})}}}const w=h();w.get("/",N.getAllProjects);w.get("/:id",N.getProjectById);typeof PhusionPassenger<"u"&&PhusionPassenger.configure({autoInstall:!1});const n=h();n.use("/",h.static("client"));const{url:j,cors:se}=p.server,te={swaggerDefinition:{openapi:"3.0.0",info:{title:"API Documentation",version:"1.0.0",description:"Documentation interactive pour mon API"},servers:[{url:j,description:`API Serveur - ${j}`}]},apis:["./src/routes/*.js"]},oe=q(te);n.use("/api-docs",P.serve,P.setup(oe));n.use(h.urlencoded({extended:!0}));n.use(h.json());n.use((t,e,s)=>{e.header("Access-Control-Allow-Origin",[se]),e.header("Access-Control-Allow-Headers","Content-Type, Accept, Authorization"),e.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE"),e.header("Access-Control-Allow-Credentials",!0),t.method==="OPTIONS"?e.sendStatus(200):s()});n.use(I());n.get("/config",(t,e)=>{const{dialect:s,database:o,user:r,_:c,dbhost:a}=p.database,{url:i,host:l,port:d,secure:m,cors:A}=p.server;e.status(200).json({url:i,host:l,port:d,secure:m,cors:A,dialect:s,database:o,user:r,dbhost:a})});n.use("/",S);n.use("/projects",w);n.get("/public-stuff",re);n.get("/private-stuff",k,ne);n.get("/profile",k,ae);if(typeof PhusionPassenger<"u")n.listen("passenger");else{const{port:t,host:e}=p.server;n.listen(t,e,()=>{console.log(`🚀 Server listening on http://${e}:${t}`)})}function k(t,e,s){var c,a;console.log("Traitement de la requête en cours ...");const o=(a=(c=t.headers)==null?void 0:c.authorization)==null?void 0:a.split("Bearer ")[1];if(!o)return e.status(401).json({status:401,message:"No access token provided in request headers"});if(console.log("Vérification du token en cours ..."),!K(o))return e.status(401).json({status:401,message:"Invalid access token"});console.log("Requete acceptée (JWT TOKEN)"),t.accessToken=o,s()}function re(t,e){e.json({status:200,message:"This is some public resource."})}function ne(t,e){console.log(`JWT récupéré depuis la requête : ${t.accessToken}`),console.log(`Récupération de l'id : ${B.jwtDecode(t.accessToken).id}`),e.status(200).json({status:200,message:"This is some private resource"})}function ae(t,e){const s={address:{lastname:"DARK",firstname:"Enzo",streetAddress:"1 rue du fleuve",postCode:"57000",city:"METZ"}};e.status(200).json({status:200,data:s})}
