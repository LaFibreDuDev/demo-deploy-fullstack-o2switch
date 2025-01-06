import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index.js";

/**
 * Represents a User model.
 * 
 * @class User
 * @extends Model
 * 
 * @property {string} username - The username of the user.
 * @property {string} email - The unique email of the user.
 * @property {string} password - The password of the user (hashed).
 */
export class User extends Model {}

User.init({
  /**
   * The username of the user.
   * @type {string}
   */
  username: { type: DataTypes.STRING },
  
  /**
   * The unique email of the user.
   * @type {string}
   */
  email: { type: DataTypes.STRING, unique: true },
  
  /**
   * The password of the user (hashed).
   * @type {string}
   */
  password: { type: DataTypes.STRING }
}, { sequelize, timestamps: true });