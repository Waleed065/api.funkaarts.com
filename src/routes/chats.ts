import { Router } from "express";
import Mongoose from "mongoose";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Catch, NotFound, Then } from "../utils/res";
import ChatRoomsSchema from "../schemas/ChatRoomsSchema";
import { userIdHeader } from "../utils/constants";


const router = Router();

router.route("/:chatRoomId").get(authMiddleware, (req, res) => {
  const { chatRoomId } = req.params;
  const { chatId } = req.query;
  const userId = req.header(userIdHeader);

  const onSuccess = Then(res);
  const onError = Catch(res);
  const InvalidRequest = NotFound(res);

  if (!chatId) return InvalidRequest([]);

  ChatRoomsSchema.aggregate([
    {
      $match: {
        _id: Mongoose.Types.ObjectId(chatRoomId),
        members: userId,
      },
    },
    {
      $project: {
        _id: 1,
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
              _id: { $lt: Mongoose.Types.ObjectId(chatId as string) },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 10 },
          { $sort: { createdAt: 1 } },
        ],
      },
    },
  ])
    .then((result) => onSuccess(result?.[0]?.messages))
    .catch(onError);
});

export default router;
