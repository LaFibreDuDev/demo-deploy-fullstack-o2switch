import express from "express";
import cookieParser from "cookie-parser";
import config from "./config.js";

import { verifyJwtToken } from "./lib/tokens.js";
import { jwtDecode } from "jwt-decode";

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

// wrapper o2switch
if (typeof(PhusionPassenger) !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

// Express app
const app = express();

// Client pages (for testing purposes)
app.use("/", express.static("client"));

// Définir l'URL du serveur via le env
const { url } = config.server;

// Configuration Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Utilisation de la version OpenAPI 3.0.0
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation interactive pour mon API',
    },
    servers: [
      {
        url: url, 
        description: `API Serveur - ${url}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Fichiers contenant des commentaires de Swagger
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Body parsers
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(express.json()); // application/json

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:5173', 'https://backend.lafibredudev.com']);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);

  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// Cookie parser
app.use(cookieParser());

app.get('/config', (req, res) => {
  const { dialect, database, user, _, dbhost } = config.database;
  const { url, host, port, secure } = config.server;
  console.log('server', url, host, port, secure)
  console.log('db', dialect, database, user, dbhost)
});

// Authentication routes
app.use('/', authRoutes);
app.use('/projects', projectRoutes);

// Any API resources
app.get("/public-stuff", getPublicStuff);
app.get("/private-stuff", isAuthenticated, getPrivateStuff);
app.get("/profile", isAuthenticated, getProfile)


// wrapper o2switch
if (typeof(PhusionPassenger) !== 'undefined') {
  app.listen('passenger');
} else {
  // HTTP server
  const { port, host } = config.server; 
  app.listen(port, host, () => {
    console.log(`🚀 Server listening on http://${host}:${port}`);
  });
}

// ==================================================
// =========== Authentication middleware ============
// ==================================================

function isAuthenticated(req, res, next) {
  console.log("Traitement de la requête en cours ...")

  // Get access token from either cookies (browsers) or Authorization headers (any service)
  const accessToken = req.headers?.["authorization"]?.split("Bearer ")[1];
  if (! accessToken) { return res.status(401).json({ status: 401, message: "No access token provided in request headers" }); }

  console.log("Vérification du token en cours ...")

  const decodedToken = verifyJwtToken(accessToken);
  if (! decodedToken) { return res.status(401).json({ status: 401, message: "Invalid access token" }); }
  
  console.log('Requete acceptée (JWT TOKEN)')

  // ETAPE 6 : je stocke l'accesstoken dans la requete pour
  // avoir la possibilité de récupérer l'id de l'utilisateur
  req.accessToken = accessToken
  
  next();
}

// ==================================================
// ================ ANY API RESOURCES ===============
// ==================================================

function getPublicStuff(_, res) {
  res.json({ status: 200, message: "This is some public resource." });
}

function getPrivateStuff(req, res) {
  // ETAPE 7 : JE PEUX ICI ENVOYER DES DONNEES PERSONNELLES
  // je peux aussi récupérer le JWT ici 
  // en le décodant, je pourrais accéder à l'id, pour faire des REQ SQL ultérieurement
  console.log(`JWT récupéré depuis la requête : ${req.accessToken}`)
  console.log(`Récupération de l'id : ${jwtDecode(req.accessToken).id}`)

  // SELECT * FROM posts WHERE authorId = '${jwtDecode(req.accessToken).id}'

  res.status(200).json({ status: 200, message: "This is some private resource" });
}

function getProfile(req, res) {
  // Ces données pourront faire l'objet d'une requête vers la DB
  const data = {
    address: {
      lastname: 'DARK',
      firstname: 'Enzo',
      streetAddress: '1 rue du fleuve',
      postCode: '57000',
      city: 'METZ',
    }
  }
  res.status(200).json({ status: 200, data: data });
}
