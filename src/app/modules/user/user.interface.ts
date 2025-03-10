import { Document, Model } from 'mongoose';

// Enum for User Roles
export enum UserRole {
   ADMIN = 'admin',
   STUDENT = 'student',
   TUTOR = 'tutor'
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  phoneNo?: string;
  gender?: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  address?: string;
  photo?: string;
}

export interface UserModel extends Model<IUser> {
   //instance methods for checking if passwords are matched
   isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
   ): Promise<boolean>;
   isUserExistsByEmail(id: string): Promise<IUser>;
   checkUserExist(userId: string): Promise<IUser>;
}
