import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const userModel: Model<IUser> = mongoose.model<IUser>("users", UserSchema);

export default userModel;