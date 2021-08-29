import { NextFunction, Request, Response } from "express";
import { Catch, NotFound } from "../utils/res";
import firebaseAdmin from "firebase-admin";
import { tokenHeader, userIdHeader } from "../utils/constants";

export function authMiddlewareAlongUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header(tokenHeader);
  const _id = req.header(userIdHeader);

  const invalidRequest = NotFound(res);
  const onError = Catch(res);

  if (!token || !_id) return invalidRequest([]);

  firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const { uid, email, email_verified, phone_number, name, picture } =
        decodedToken;
      if (uid === _id) {
        res.locals.email = email;
        res.locals.emailVerified = email_verified;
        res.locals.phoneNumber = phone_number;
        res.locals.displayName = name;
        res.locals.photoURL = picture;

        next();
      } else {
        invalidRequest([]);
      }
    })
    .catch(onError);
}
