import { Router } from "express";
import ItemsSchema from "../schemas/ItemsSchema";
import { Catch, NotFound, Then } from "../utils/res";
const router = Router();

router.route("/").get((req, res) => {

  const {q, service, country, city} = req.query;
  const onSuccess = Then(res);
  const onError = Catch(res);

  if (!q) {
    const InvalidRequest = NotFound(res);
    return InvalidRequest([]);
  }

  const query = {
    ...(service && {serviceId: service}),
    ...(country && {countryId: country}),
    ...(city && {cityId: city})
  }
  
  ItemsSchema.find(
    {
      ...query,
      $text: { $search: q.toString() },
    },
    {
      score: { $meta: "textScore" },
      _id: 0,
      title: 1,
    }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(4)
    .then(onSuccess)
    .catch(onError);
});

export default router;
