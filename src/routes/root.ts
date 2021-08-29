import { Then } from "../utils/res";
import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  const onSuccess = Then(res);

  return onSuccess("Connected Successfully");
});

export default router;
