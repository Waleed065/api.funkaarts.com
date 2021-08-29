import { Router } from "express";
import CommentsSchema from "../schemas/CommentsSchema";

import { Catch, Then } from "../utils/res";

const router = Router();

router.route("/").get((req, res) => {
  const onSuccess = Then(res);
  const onError = Catch(res);

  CommentsSchema.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .then(onSuccess)
    .catch(onError);
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const onSuccess = Then(res);
  const onError = Catch(res);

  CommentsSchema.find({ itemId: id })
    .limit(10)
    .sort({ createdAt: -1 })
    .then(onSuccess)
    .catch(onError);
});

export default router;
