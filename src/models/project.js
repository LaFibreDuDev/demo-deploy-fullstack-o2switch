import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index.js";

/**
 * Represents a Project model.
 * 
 * @class Project
 * @extends Model
 * 
 * @property {string} description - The description of the project.
 * @property {string} image - The URL to the project's image.
 */
export class Project extends Model {}

Project.init({
    /**
     * The name of the project.
     * @type {string}
     */
    name: { type: DataTypes.STRING },

    /**
     * The description of the project.
     * @type {string}
     */
    description: { type: DataTypes.STRING },

    /**
     * The URL to the project's image.
     * @type {string}
     */
    image: { type: DataTypes.STRING }
}, { sequelize, tableName: 'Projects' });