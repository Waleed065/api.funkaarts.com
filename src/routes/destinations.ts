import { Router } from "express";

import { Then, Catch } from "../utils/res";
import ItemsSchema from "../schemas/ItemsSchema";

const router = Router();

router.route("/:serviceId").get((req, res) => {
  const { serviceId } = req.params;
  const onSuccess = Then(res);
  const onError = Catch(res);

  return ItemsSchema.aggregate([
    { $match: { serviceId } },
    { $group: { _id: "$countryId", cities: { $addToSet: "$cityId" } } },
  ])
    .then(onSuccess)
    .catch(onError);
});

export default router;
