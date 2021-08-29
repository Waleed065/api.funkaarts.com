import { Router } from "express";
import ItemsSchema from "../schemas/ItemsSchema";
import { Catch, NotFound, Then } from "../utils/res";
import { authMiddleware } from "../middlewares/authMiddleware";
import OrdersSchema from "../schemas/OrdersSchema";
import { userIdHeader } from "../utils/constants";

const router = Router();

router.route("/").get(authMiddleware, (req, res) => {
  const _id = req.header(userIdHeader);

  const onSuccess = Then(res);
  const onError = Catch(res);
  /*
  db.orders.aggregate([
    {
      $match: {userId: _id},
    },
    { 
      $group: { _id: "$userId", itemIds: { $addToSet: "$itemId" } }
    },
    {
      $lookup: {
        from: 'items',
        localField: 'itemIds',
        foreignField: '_id',
        as: 'orders'
      }
    },
    {
      $project: {
        orders: 1
      }
    }
  ])
  */

  OrdersSchema.distinct("itemId", { userId: _id })
    .then((result) => {
      ItemsSchema.find({ _id: { $in: result } })
        .then(onSuccess)
        .catch(onError);
    })
    .catch(onError);
});

router.route("/").post(authMiddleware, (req, res) => {
  const {
    payload = {},
    meta: { email },
  } = req.body;

  const onSuccess = Then(res);
  const onError = Catch(res);
  const invalidRequest = NotFound(res);

  if (!email) return invalidRequest([]);

  OrdersSchema.insertMany(payload)
    .then((result) => {

      return onSuccess(result);
    })
    .catch(onError);
});

export default router;
