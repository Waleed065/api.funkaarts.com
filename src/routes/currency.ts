import { Router } from "express";
import { Catch, NotFound, Then } from "../utils/res";
import axios from "axios";

const router = Router();

const endpoint = "";
const access_key = "";

router.route("/:currencyCode").get((req, res) => {
  const { currencyCode } = req.params;

  const onSuccess = Then(res);
  const onError = Catch(res);
  const invalidRequest = NotFound(res);

  axios
    .get(
      `http://data.fixer.io/api/${endpoint}?access_key=${access_key}&symbols=${currencyCode}`
    )
    .then((response) => {
      if (!response.data.success) {
        return invalidRequest(0);
      }

      const rate = response.data.rates?.[currencyCode];

      if (rate > 0) {
        return onSuccess(rate);
      } else {
        return invalidRequest(0);
      }
    })
    .catch(onError);
});

export default router;
