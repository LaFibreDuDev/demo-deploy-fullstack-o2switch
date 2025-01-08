"use strict";const e=require("./project-CXNuEWLs.cjs"),o=async()=>{try{await e.sequelize.dropAllSchemas({force:!0}),await e.sequelize.sync({force:!0});const t=[{name:"projet 1",description:"Un projet de portfolio réalisé avec React, Zustand et React-routeur-dom",image:"https://blog-fr.orson.io/wp-content/uploads/2017/08/Template-responsive-design.png"},{name:"projet 2",description:"Un projet e-commerce réalisé avec Node, PostGreSQL et express",image:"https://www.codeur.com/blog/wp-content/uploads/2022/07/4.-PlurielSingulier.jpg"},{name:"projet 3",description:"Un site vitrine réalisé avec Wordpress et PHP",image:"https://www.livepepper.fr/wp-content/uploads/page/site-vitrine-restaurant-livepepper-academy-1-1024x744.png"}];await e.Project.bulkCreate(t);const r=await e.hash("student42oclock");await e.User.create({username:"Student",email:"student@oclock.io",password:r}),await e.sequelize.close()}catch(t){console.error("Erreur lors de l'exécution du script:",t)}};o();
