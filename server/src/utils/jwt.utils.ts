import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  role: string;
  email?: string;
}

interface DecodedJWT extends JWTPayload {
  iat: number;
  exp: number;
}

interface RefreshTokenPayload {
  id: string;
  type: "refresh";
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
}

class JWTService {
  private static readonly ISSUER = "property-management-api";
  private static readonly AUDIENCE = "property-management-users";

  public static generateAccessToken(
    userId: string,
    role: string,
    email?: string
  ): string {
    try {
      const payload: JWTPayload = {
        id: userId,
        role,
        ...(email && { email }),
      };

      return jwt.sign(payload, this.getJwtSecret(), {
        expiresIn: this.getAccessTokenExpiry(),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      } as jwt.SignOptions);
    } catch (error) {
      throw new Error("Error generating access token");
    }
  }

  public static generateRefreshToken(userId: string): string {
    try {
      const payload: RefreshTokenPayload = {
        id: userId,
        type: "refresh",
      };

      return jwt.sign(payload, this.getRefreshTokenSecret(), {
        expiresIn: this.getRefreshTokenExpiry(),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      } as jwt.SignOptions);
    } catch (error) {
      throw new Error("Error generating refresh token");
    }
  }

  public static verifyAccessToken(token: string): DecodedJWT {
    try {
      const decoded = jwt.verify(token, this.getJwtSecret(), {
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      }) as DecodedJWT;

      return decoded;
    } catch (error) {
      this.handleTokenError(error);
    }
  }

  public static verifyRefreshToken(refreshToken: string): RefreshTokenPayload {
    try {
      const decoded = jwt.verify(refreshToken, this.getRefreshTokenSecret(), {
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      }) as RefreshTokenPayload;

      if (decoded.type !== "refresh") {
        throw new Error("Invalid refresh token type");
      }

      return decoded;
    } catch (error) {
      this.handleTokenError(error, true);
    }
  }

  public static generateTokenPair(
    userId: string,
    role: string,
    email?: string
  ): TokenPair {
    return {
      accessToken: this.generateAccessToken(userId, role, email),
      refreshToken: this.generateRefreshToken(userId),
      tokenType: "Bearer",
      expiresIn: this.getAccessTokenExpiry(),
    };
  }

  public static extractTokenFromHeader(
    authHeader: string | undefined
  ): string | null {
    if (!authHeader) return null;

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return null;

    return parts[1];
  }

  public static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as { exp?: number };
      return !decoded?.exp || decoded.exp < Math.floor(Date.now() / 1000);
    } catch {
      return true;
    }
  }

  public static getTokenExpiration(token: string): Date | null {
    try {
      const decoded = jwt.decode(token) as { exp?: number };
      return decoded?.exp ? new Date(decoded.exp * 1000) : null;
    } catch {
      return null;
    }
  }

  private static getJwtSecret(): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    return process.env.JWT_SECRET;
  }

  private static getRefreshTokenSecret(): string {
    return process.env.JWT_REFRESH_SECRET || this.getJwtSecret();
  }

  private static getAccessTokenExpiry(): string {
    return process.env.JWT_EXPIRE || "7d";
  }

  private static getRefreshTokenExpiry(): string {
    return process.env.JWT_REFRESH_EXPIRE || "30d";
  }

  private static handleTokenError(
    error: unknown,
    isRefreshToken = false
  ): never {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error(
        `${isRefreshToken ? "Refresh" : "Access"} token has expired`
      );
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error(`Invalid ${isRefreshToken ? "refresh" : "access"} token`);
    }
    throw new Error(
      `${isRefreshToken ? "Refresh" : "Access"} token verification failed`
    );
  }
}

export default JWTService;
