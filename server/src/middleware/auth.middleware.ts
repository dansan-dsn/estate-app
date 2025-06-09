import { Request, Response, NextFunction } from "express";
import UserService from "@/services/user.services";
import JWTServices from "@/utils/jwt.utils";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = JWTServices.extractTokenFromHeader(
      req.headers["authorization"]
    );

    if (!token) {
      return res.status(401).json({
        message: "Access token required",
        error: "MISSING_TOKEN",
      });
    }

    if (JWTServices.isTokenExpired(token)) {
      return res.status(401).json({
        message: "Token has expired",
        error: "TOKEN_EXPIRED",
      });
    }

    const decoded = JWTServices.verifyAccessToken(token);

    const user = await UserService.getUserById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: "Invalid or inactive user",
        error: "INVALID_USER",
      });
    }

    req.user = user;
    next();
  } catch (error: any) {
    return res.status(403).json({
      message: error.message || "Invalid token",
      error: "TOKEN_VERIFICATION_FAILED",
    });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
        error: "NOT_AUTHENTICATED",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required roles: ${roles.join(", ")}`,
        error: "INSUFFICIENT_PERMISSIONS",
        userRole: req.user.role,
        requiredRoles: roles,
      });
    }

    next();
  };
};
