import { Request, Response, Router } from "express";
// import { ObjectId } from "mongoose";
import HeadingsSchema from "../schemas/HeadingsSchema";
import { Catch, Then } from "../utils/res";

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  const onSuccess = Then(res);
  const onError = Catch(res);

  return HeadingsSchema.find().then(onSuccess).catch(onError);
});

export default router;
