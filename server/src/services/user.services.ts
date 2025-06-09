import { User } from "../models/user.model";
import { IUser, userRole } from "../shared/interfaces/user";
import PasswordService from "../utils/password.utils";

class UserService {
  static async createUser(userData: Partial<IUser>): Promise<IUser> {
    if (userData.password) {
      userData.password = await PasswordService.hash(userData.password);
    }

    const user = new User(userData);
    return await user.save();
  }

  static async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("-password");
  }

  static async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  static async getUsersByRole(role: userRole): Promise<IUser[]> {
    return await User.find({ role, isActive: true }).select("-password");
  }

  static async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    if (updateData.password) {
      updateData.password = await PasswordService.hash(updateData.password);
    }

    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");
  }

  static async updateAgentProfile(
    userId: string,
    agentData: any
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { $set: { agentProfile: agentData } },
      { new: true }
    ).select("-password");
  }

  static async updateTenantProfile(
    userId: string,
    tenantData: any
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { $set: { tenantProfile: tenantData } },
      { new: true }
    ).select("-password");
  }

  static async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return !!result;
  }

  static async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const users = await User.find({ isActive: true })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments({ isActive: true });

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async searchUsers(query: string): Promise<IUser[]> {
    return await User.find({
      isActive: true,
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    }).select("-password");
  }
}

export default UserService;
