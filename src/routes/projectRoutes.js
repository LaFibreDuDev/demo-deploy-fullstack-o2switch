import express from "express";
import ProjectController from "../controllers/ProjectController.js";

// Express app
const app = express();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Récupère tous les projets.
 *     description: Retourne la liste complète des projets enregistrés dans la base de données.
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Liste des projets récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Projet Alpha
 *                   description:
 *                     type: string
 *                     example: Un projet important pour l'équipe.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-01-01T10:00:00Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-01-02T12:00:00Z
 *       500:
 *         description: Une erreur est survenue lors de la récupération des projets.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Une erreur est survenue lors de la récupération des projets.
 */
app.get('/', ProjectController.getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Récupère un projet par son ID.
 *     description: Retourne un projet spécifique basé sur son identifiant unique.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du projet à récupérer.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Projet récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Projet Alpha
 *                 description:
 *                   type: string
 *                   example: Un projet important pour l'équipe.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-01-01T10:00:00Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-01-02T12:00:00Z
 *       404:
 *         description: Projet introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Project not found.
 *       500:
 *         description: Une erreur est survenue lors de la récupération du projet.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Une erreur est survenue lors de la récupération du projet.
 */
app.get('/:id', ProjectController.getProjectById);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Créer un nouveau projet
 *     description: Ajoute un nouveau projet à la base de données.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du projet
 *                 example: Mon projet
 *               description:
 *                 type: string
 *                 description: Une courte description du projet
 *                 example: Ceci est un projet pour tester l'API.
 *               image:
 *                 type: string
 *                 description: URL de l'image associée au projet
 *                 example: https://example.com/image.png
 *     responses:
 *       201:
 *         description: Projet créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Projet créé avec succès !
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Mon projet
 *                     description:
 *                       type: string
 *                       example: Ceci est un projet pour tester l'API.
 *                     image:
 *                       type: string
 *                       example: https://example.com/image.png
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-19T12:34:56.789Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-19T12:34:56.789Z
 *       400:
 *         description: Requete invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Le champ "name" est obligatoire.
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Une erreur est survenue lors de la création du projet.
 */
app.post('/', ProjectController.addProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Modifier un projet existant
 *     description: Met à jour les informations d'un projet en fonction de son ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du projet à modifier
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom du projet
 *                 example: Projet mis à jour
 *               description:
 *                 type: string
 *                 description: Nouvelle description du projet
 *                 example: Ceci est une description mise à jour.
 *               image:
 *                 type: string
 *                 description: Nouvelle URL de l'image du projet
 *                 example: https://example.com/new-image.png
 *     responses:
 *       200:
 *         description: Projet mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Projet mis à jour avec succès !
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Projet mis à jour
 *                     description:
 *                       type: string
 *                       example: Ceci est une description mise à jour.
 *                     image:
 *                       type: string
 *                       example: https://example.com/new-image.png
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-19T12:34:56.789Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-19T13:00:00.000Z
 *       404:
 *         description: Projet non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Projet non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Une erreur est survenue lors de la mise à jour du projet.
 */
app.put('/:id', ProjectController.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Supprimer un projet
 *     description: Supprime un projet existant en fonction de son ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du projet à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Projet supprimé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Projet supprimé avec succès !
 *       404:
 *         description: Projet non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Projet non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Une erreur est survenue lors de la suppression du projet.
 */
app.delete('/:id', ProjectController.deleteProject);

export default app;