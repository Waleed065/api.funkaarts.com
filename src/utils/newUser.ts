import firebaseAdmin from "firebase-admin";
import { Response } from "express";
import UserSchema from "../schemas/UserSchema";
import ChatRoomsSchema from "../schemas/ChatRoomsSchema";
import { Catch, Then } from "./res";
import { adminId } from "./constants";

interface schema {
  res: Response;
  _id: string;
}
export default function newUser({ res, _id }: schema) {
  const onSuccess = Then(res);
  const onError = Catch(res);

  const { email, emailVerified, displayName, photoURL, phoneNumber } =
    res.locals;
  const userInfo = {
    _id,
    ...(phoneNumber && { phoneNumber }),
    ...(photoURL && { photoURL }),
    ...(displayName && { displayName }),
    ...(email && { email }),
    emailVerified,
    favorites: [],
  };

  try {
    const promises: Promise<any>[] = [];
    let fallback = "";

    promises.push(
      new Promise((resolve, reject) => {
        UserSchema.create(userInfo)
          .then(() => {
            return resolve(true);
          })
          .catch((err) => {
            console.log({ user: err });

            fallback += "UserSchema";
            return reject(false);
          });
      })
    );

    promises.push(
      new Promise((resolve, reject) => {
        ChatRoomsSchema.updateOne(
          {
            members: [_id, adminId],
          },
          { $set: { members: [_id, adminId] } },
          { upsert: true }
        )
          .then(() => {
            return resolve(true);
          })
          .catch((err) => {
            fallback += "ChatRoomsSchema";
            console.log({ chatRoom: err });
            return reject(false);
          });
      })
    );

    return Promise.allSettled(promises).then((results) => {
      if (results.every((result) => result.status === "fulfilled")) {
        return onSuccess({
          ...userInfo,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        switch (fallback) {
          case "UserSchema":
            ChatRoomsSchema.deleteOne({
              members: { $all: [_id, adminId] },
            }).catch((err) => console.log({ err }));
            break;

          case "ChatRoomsSchema":
            UserSchema.deleteOne({ _id }).catch((err) => console.log({ err }));
            break;
        }

        return onError("Error");
      }
    });
  } catch (err) {
    return onError(err);
  }
}
