import { Router } from "express";
import UserSchema from "../schemas/UserSchema";
import { Catch, NotFound, Then } from "../utils/res";
import { authMiddleware } from "../middlewares/authMiddleware";
import { userIdHeader } from "../utils/constants";

const router = Router();

/* ------------Favorites----------- */
router.route("/").get(authMiddleware, (req, res) => {
  const _id = req.header(userIdHeader);

  const onSuccess = Then(res);
  const onError = Catch(res);

  UserSchema.aggregate([
    {
      $match: {
        _id,
      },
    },
    {
      $project: {
        _id: 0,
        favorites: 1,
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "favorites",
        foreignField: "_id",
        as: "favorites",
      },
    },
  ])
    .then((result: any) => onSuccess(result[0]?.favorites))
    .catch(onError);
});

router.route("/").post(authMiddleware, (req, res) => {
  const { payload = {} } = req.body;
  const _id = req.header(userIdHeader);

  const onSuccess = Then(res);
  const onError = Catch(res);

  UserSchema.updateOne(
    { _id },
    { $push: { favorites: payload } },
    { upsert: true }
  )
    .then(onSuccess)
    .catch(onError);
});

router.route("/:itemId").delete(authMiddleware, (req, res) => {
  const { itemId } = req.params;
  const _id = req.header(userIdHeader);

  const onSuccess = Then(res);
  const onError = Catch(res);
  const InvalidRequest = NotFound(res);

  if (!itemId || typeof itemId !== "string") {
    return InvalidRequest([]);
  }

  UserSchema.updateOne(
    { _id },
    { $pull: { favorites: itemId } },
    { upsert: true }
  )
    .then(onSuccess)
    .catch(onError);
});

export default router;
