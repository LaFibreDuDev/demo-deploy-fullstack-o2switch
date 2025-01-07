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

export default app;