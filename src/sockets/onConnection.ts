import { Socket } from "socket.io";
import { chatRoomConst } from "../constants";
import ChatRooms from "../schemas/ChatRoomsSchema";

export default function message(socket: Socket) {
  const _id = socket.request.headers["x-api-key"];
  ChatRooms.aggregate([
    {
      $match: {
        members: _id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
      },
    },
    {
      $project: {
        _id: 1,
        members: {
          $filter: {
            input: "$members",
            as: "members",
            cond: {
              $ne: ["$$members._id", _id],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        members: {
          displayName: 1,
          photoURL: 1,
        },
      },
    },

    {
      $lookup: {
        from: "chats",
        as: "messages",

        let: { chat_room_id: "$_id" },

        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$chatRoomId", "$$chat_room_id"],
              },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 10 },
          { $sort: { createdAt: 1 } },
        ],
      },
    },
  ])
    .then((results) => {
      const rooms = results.map((room) => room._id.toString());
      socket.join(rooms);

      return socket.emit(chatRoomConst, results);
    })
    .catch((err) => {
      return socket.emit(chatRoomConst, []);
    });
}
