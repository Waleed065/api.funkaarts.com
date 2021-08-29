import { Socket } from "socket.io";
import { io } from "../connection";
import { messageConst } from "../constants";
import Chats from "../schemas/ChatsSchema";
import { messageSchema } from "../types";
import { v4 } from "uuid";

export default function message(socket: Socket) {
  return socket.on(messageConst, ({ chatRoomId, content, from, type }) => {
    Chats.create({
      chatRoomId,
      content,
      from,
      type,
    })
      .then((data: messageSchema | any) => {
        const { _id, createdAt, updatedAt } = data;
        return io.to(chatRoomId).emit(messageConst, {
          _id,
          chatRoomId,
          content,
          from,
          type,
          createdAt,
          updatedAt,
        });
      })
      .catch(() => {
        return socket.emit(messageConst, {
          id: v4(),
          chatRoomId,
          content,
          from,
          type,
          createdAt: new Date(),
          updatedAt: new Date(),
          error: true,
        });
      });
  });
}
