import { hash } from "../lib/crypto.js";
import { sequelize } from "./index.js";
import { Project } from "./project.js";
import { User } from "./user.js";

const resetDb = async() => {
    await sequelize.dropAllSchemas({ force: true });
    await sequelize.sync({ force: true });

    // Création d'un utilisateur
    await User.create({
        username: 'Student',
        email: 'student@oclock.io',
        password: await hash('student42oclock')
    })

    // Création de trois projets portfolio
    const projects = [
        {
            name: "projet 1",
            description: "Un projet de portfolio réalisé avec React, Zustand et React-routeur-dom",
            image: "https://blog-fr.orson.io/wp-content/uploads/2017/08/Template-responsive-design.png"
        },
        {
            name: "projet 2",
            description: "Un projet e-commerce réalisé avec Node, PostGreSQL et express",
            image: "https://www.codeur.com/blog/wp-content/uploads/2022/07/4.-PlurielSingulier.jpg"
        },
        {
            name: "projet 3",
            description: "Un site vitrine réalisé avec Wordpress et PHP",
            image: "https://www.livepepper.fr/wp-content/uploads/page/site-vitrine-restaurant-livepepper-academy-1-1024x744.png"
        },
    ]
    await Project.bulkCreate(projects)
    await sequelize.close()
}

resetDb()
