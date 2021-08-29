import { Router } from "express";
import ItemsSchema from "../schemas/ItemsSchema";
import { Catch,  Then } from "../utils/res";
import { authMiddleware } from "../middlewares/authMiddleware";
import PendingItemsSchema from "../schemas/PendingItemsSchema";
import { userIdHeader } from "../utils/constants";

const router = Router();

router.route("/pending").get(authMiddleware, (req, res) => {
  const _id = req.header(userIdHeader);

  const onSuccess = Then(res);
  const onError = Catch(res);

  PendingItemsSchema.find({ userId: _id }).then(onSuccess).catch(onError);
});

router.route("/pending").post(authMiddleware, (req, res) => {
  const onSuccess = Then(res);
  const onError = Catch(res);
  const { payload = {}} = req.body;

  return PendingItemsSchema.create(payload).then(onSuccess).catch(onError);
});

router.route("/active").get(authMiddleware, (req, res) => {
  const _id = req.header(userIdHeader);

  const onSuccess = Then(res);
  const onError = Catch(res);

  ItemsSchema.find({ userId: _id }).then(onSuccess).catch(onError);
});

export default router;
