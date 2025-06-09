import { Document } from "mongoose";

export type userRole = "admin" | "agent" | "tenant";

export interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: userRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  agentProfile?: {
    licenseNumber?: string;
    agency?: string;
    commission?: number;
    specializations?: string[];
    yearsOfExperience?: number;
  };

  tenantProfile?: {
    dateOfBirth?: Date;
    occupation?: string;
    monthlyIncome?: number;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };

    identificationNumber?: string;
    employerDetails?: {
      company: string;
      position: string;
      workPhone: string;
    };
  };
}
