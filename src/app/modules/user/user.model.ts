import mongoose, { Schema } from "mongoose";
import { IUser, UserModel, UserRole } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.STUDENT],
      default: UserRole.STUDENT,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phoneNo: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^\d{11}$/.test(v);
        },
        message: "Phone number must be 11 digits long",
      },
      default: "01700000000",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    dateOfBirth: {
      type: String,
      default: "n/a",
    },
    address: {
      type: String,
      default: "n/a",
    },
    photo: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^(http(s)?:\/\/.*\.(?:png|jpg|jpeg))/.test(v);
        },
        message: "Invalid photo URL format.",
      },
      default: "https://i.ibb.co/dKHwTp8/PS.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.checkUserExist = async function (userId: string) {
  const existingUser = await this.findById(userId);

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User does not exist!");
  }

  if (!existingUser.isActive) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User is not active!");
  }

  return existingUser;
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);
export default User;
