import { Schema, connection } from "mongoose";

const ChatRoomsSchema = new Schema(
  {

    members: {
      type: [String],
      required: true,
      validate: {
        validator: (e: any) => arrayLimit({ e, length: 2 }),
        message: "Minimum of two members are required",
      },
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

function arrayLimit({ e, length }: { e: number[]; length: number }) {
  return e.length >= length;
}

const ChatRooms = connection.model("chat_rooms", ChatRoomsSchema);
export default ChatRooms;
