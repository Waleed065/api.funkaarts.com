import { NextFunction, Request, Response } from "express";
import { Catch, NotFound } from "../utils/res";
import firebaseAdmin from "firebase-admin";
import { tokenHeader, userIdHeader } from "../utils/constants";

export function authMiddleware(
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
      const uid = decodedToken.uid;
      if (uid === _id) {
        next();
      } else {
        invalidRequest([]);
      }
    })
    .catch(onError);
}
