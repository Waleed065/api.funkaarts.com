import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import firebaseAdmin from "firebase-admin";
import { tokenHeader, userIdHeader } from "../utils/constants";

export default function socketAuthMiddleware(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const token = socket.request.headers[tokenHeader.toLowerCase()];
  const _id = socket.request.headers[userIdHeader];

  if (!token || !_id) return next(new Error("invalid"));

  firebaseAdmin
    .auth()
    .verifyIdToken(token as string)
    .then((decodedToken) => {
      const uid = decodedToken.uid;

      if (uid === _id) {
        next();
      } else {
        next(new Error("invalid request"));
      }
    })
    .catch(() => next(new Error("invalid token")));
}
