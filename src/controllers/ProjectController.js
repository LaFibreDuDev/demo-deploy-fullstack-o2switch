import { Project } from '../models/project.js';

export default class ProjectController {
  /**
   * Retrieves all projects from the database.
   * 
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>}
   */
  static async getAllProjects(req, res) {
    try {
      const projects = await Project.findAll();
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'An error occurred while fetching projects.' });
    }
  }

  /**
   * Retrieves a single project by its ID.
   * 
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>}
   */
  static async getProjectById(req, res) {
    const { id } = req.params;
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      res.status(500).json({ error: 'An error occurred while fetching the project.' });
    }
  }
}
