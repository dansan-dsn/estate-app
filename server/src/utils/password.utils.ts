import bcrypt from "bcryptjs";

class PasswordService {
  private static readonly MIN_LENGTH = 8;
  private static readonly SALT_ROUNDS = 12;

  public static async hash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error("Password hashing failed");
    }
  }

  public static async compare(
    plainText: string,
    hash: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainText, hash);
    } catch (error) {
      throw new Error("Password comparison failed");
    }
  }

  public static validate(password: string): {
    isValid: boolean;
    errors: string[];
    strength: number;
  } {
    const errors: string[] = [];
    const requirements = [
      {
        test: (p: string) => p.length >= this.MIN_LENGTH,
        message: `Password must be at least ${this.MIN_LENGTH} characters`,
      },
      {
        test: (p: string) => /[A-Z]/.test(p),
        message: "Must contain at least one uppercase letter",
      },
      {
        test: (p: string) => /[a-z]/.test(p),
        message: "Must contain at least one lowercase letter",
      },
      {
        test: (p: string) => /\d/.test(p),
        message: "Must contain at least one number",
      },
      {
        test: (p: string) => /[^A-Za-z0-9]/.test(p),
        message: "Must contain at least one special character",
      },
    ];

    requirements.forEach((req) => {
      if (!req.test(password)) errors.push(req.message);
    });

    return {
      isValid: errors.length === 0,
      errors,
      strength: this.calculateStrength(password),
    };
  }

  private static calculateStrength(password: string): number {
    let score = 0;

    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;

    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    return Math.min(score, 100);
  }
}

export default PasswordService;
