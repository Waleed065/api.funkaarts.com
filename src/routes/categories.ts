import { Router } from "express";
import ItemsSchema from "../schemas/ItemsSchema";
import CategoriesSchema from "../schemas/CategoriesSchema";

import { Catch, Then } from "../utils/res";

const router = Router();

router.route("/all/:serviceId").get((req, res) => {
  const { serviceId } = req.params;
  const onSuccess = Then(res);
  const onError = Catch(res);

  return CategoriesSchema.find({
    serviceId,
  })
    .then(onSuccess)
    .catch(onError);
});

router.route("/:serviceId/:countryId/:cityId").get((req, res) => {
  const { serviceId, countryId, cityId } = req.params;
  const { limit }: any = req.query;
  const onSuccess = Then(res);
  const onError = Catch(res);

  return ItemsSchema.aggregate([
    {
      $match: {
        serviceId,
        countryId,
        cityId,
      },
    },
    {
      $limit: parseInt(limit) || 20,
    },
    {
      $group: {
        _id: null,
        categoryId: {
          $addToSet: "$categoryId",
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $project: {
        _id: 0,
        categories: 1,
      },
    },
  ])
    .then((result) =>
      setTimeout(() => {
        return onSuccess(result?.[0]?.categories ?? []);
      }, 1500)
    )
    .catch(onError);
});

export default router;
