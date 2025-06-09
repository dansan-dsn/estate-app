import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/shared/interfaces/user";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "agent", "tenant"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    agentProfile: {
      licenseNumber: String,
      agency: String,
      commission: { type: Number, min: 0, max: 100 },
      specializations: [String],
      yearsOfExperience: { type: Number, min: 0 },
    },
    tenantProfile: {
      dateOfBirth: Date,
      occupation: String,
      monthlyIncome: { type: Number, min: 0 },
      emergencyContact: {
        name: String,
        phone: String,
        relationship: String,
      },
      identificationNumber: String,
      employerDetails: {
        company: String,
        position: String,
        workPhone: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

userSchema.pre("save", function (this: IUser, next) {
  if (this.role === "agent" && !this.agentProfile) {
    this.agentProfile = {};
  }
  if (this.role === "tenant" && !this.tenantProfile) {
    this.tenantProfile = {};
  }
  if (this.role !== "agent") {
    this.agentProfile = undefined;
  }
  if (this.role !== "tenant") {
    this.tenantProfile = undefined;
  }
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
