import { Schema, connection } from "mongoose";

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    photoURL: {
      type: String,
      default: null,
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => new Date(),
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const User = connection.model("users", UserSchema);
// User.createIndexes();

export default User;
