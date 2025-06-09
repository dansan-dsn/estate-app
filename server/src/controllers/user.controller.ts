import { Request, Response } from "express";
import UserService from "../services/user.services";
import JWTService from "../utils/jwt.utils";
import PasswordService from "../utils/password.utils";

export class UserController {
  // Register user
  static async register(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      const token = JWTService.generateAccessToken(
        String(user._id),
        String(user.role)
      );

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        token,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Registration failed",
        error: error.message,
      });
    }
  }

  // Login user
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email);
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await PasswordService.compare(
        password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = JWTService.generateAccessToken(
        String(user._id),
        String(user.role)
      );

      res.json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        token,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Login failed",
        error: error.message,
      });
    }
  }

  // Get user profile
  static async getProfile(req: any, res: Response) {
    try {
      const user = await UserService.getUserById(req.user.id);
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch profile",
        error: error.message,
      });
    }
  }

  // Update user profile
  static async updateProfile(req: any, res: Response) {
    try {
      const user = await UserService.updateUser(req.user.id, req.body);
      res.json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Profile update failed",
        error: error.message,
      });
    }
  }

  // Get users by role (admin only)
  static async getUsersByRole(req: Request, res: Response) {
    try {
      const { role } = req.params;
      const users = await UserService.getUsersByRole(role as any);
      res.json({ users });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  }

  // Get all users with pagination (admin only)
  static async getAllUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await UserService.getAllUsers(page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  }
}
