import { Router } from "express";
import UserSchema from "../schemas/UserSchema";
import { Catch, NotFound, Then } from "../utils/res";
import { authMiddlewareAlongUserInfo } from "../middlewares/authMiddlewareAlongUserInfo";
import newUser from "../utils/newUser";
import { tokenHeader, userIdHeader } from "../utils/constants";

const router = Router();

router.route("/").get(authMiddlewareAlongUserInfo, (req, res) => {
  const token = req.header(tokenHeader);
  const _id = req.header(userIdHeader);

  const invalidRequest = NotFound(res);
  const onSuccess = Then(res);
  const onError = Catch(res);

  if (_id && token) {
    UserSchema.findById(_id)
      .then((response: any) => {
        if (response) {
          return onSuccess(response);
        }
        return newUser({ res, _id });
      })
      .catch(onError);
  } else {
    return invalidRequest([]);
  }
});

router.route("/").put(authMiddlewareAlongUserInfo, (req, res) => {
  const _id = req.header(userIdHeader);
  const onSuccess = Then(res);
  const onError = Catch(res);

  const { email, emailVerified, displayName, photoURL, phoneNumber } =
    res.locals;

  const userInfo = {
    ...(phoneNumber && { phoneNumber }),
    ...(photoURL && { photoURL }),
    ...(displayName && { displayName }),
    ...(email && { email }),
    emailVerified,
  };

  UserSchema.updateOne(
    { _id },
    {
      $set: userInfo,
    },
    {
      upsert: true,
    }
  )
    .then(onSuccess)
    .catch(onError);
});

export default router;
