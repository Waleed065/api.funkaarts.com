import { Schema, connection } from "mongoose";

const ChatsSchema = new Schema(
  {
    chatRoomId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    content: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    type: {
      type: String,
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


// const database = connection.useDb("auth");

const Chats = connection.model("chats", ChatsSchema);
export default Chats;
