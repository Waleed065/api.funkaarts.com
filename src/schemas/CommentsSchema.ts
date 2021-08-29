import { Schema, connection } from "mongoose";

const CommentsSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rated: {
      type: Number,
      required: true,
    },
    upVotes: {
      type: Number,
      required: true,
    },
    downVotes: {
      type: Number,
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
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

    }
  },
  {
    timestamps: true,
    versionKey: false 
  }
);

// const database = connection.useDb("services");

const Comments = connection.model("comments", CommentsSchema);
export default Comments;
