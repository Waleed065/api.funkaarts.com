import { Router } from "express";
import { Then, Catch } from "../utils/res";
import AddOnsSchema from "../schemas/AddOnsSchema";


const router = Router();

router.route("/").get((req, res) => {
  const onSuccess = Then(res);
  const onError = Catch(res);

  return AddOnsSchema.find().then(onSuccess).catch(onError);
});

export default router;
