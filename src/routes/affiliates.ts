import { Router } from "express";
import firebaseAdmin from "firebase-admin";
import { Catch, NotFound, Then } from "../utils/res";
import AffiliatesSchema from "../schemas/AffiliatesSchema";
import { authMiddlewareAlongUserInfo } from "../middlewares/authMiddlewareAlongUserInfo";
import { userIdHeader } from "../utils/constants";
import sendMail from "../utils/sendMail";
import { affiliateText, affliateHtml } from "../html/affiliateMail";

const router = Router();
const refFromURL = (URL: string): string =>
  decodeURIComponent(URL.split("/").pop()?.split("?").shift() ?? "");

router.route("/pending").post(authMiddlewareAlongUserInfo, (req, res) => {
  const onSuccess = Then(res);
  const onError = Catch(res);
  const invalidRequest = NotFound(res);

  const _id = req.header(userIdHeader);
  const {
    identityPictures,
    affiliations,
    websiteName,
    websiteUrl,
    industry,
    promoCode,
  } = req.body.payload;

  const { email, emailVerified, phoneNumber, displayName } = res.locals;

  if (!(emailVerified && phoneNumber?.length > 9)) return invalidRequest([]);

  const returnError = ({ err, aid }: { err: any; aid: string }) => {
    try {
      identityPictures.forEach((img: string) => {
        firebaseAdmin.storage().bucket().file(refFromURL(img)).delete();
      });

      AffiliatesSchema.deleteOne({ _id: aid })
        .then(() => onError(err))
        .catch(onError);
    } catch (err) {
      return onError(err);
    }
  };

  return AffiliatesSchema.create({
    userId: _id,
    identityPictures,
    affiliations,
    websiteName,
    websiteUrl,
    industry,
    promoCode,
  })
    .then((result) => {
      const aid = result._id.toString();

      firebaseAdmin
        .auth()
        .setCustomUserClaims(_id as string, {
          aid,
        })
        .then(() => {
          const html = affliateHtml({
            aid,
            displayName: displayName ?? email.replace(/@.*/, ""),
            email,
          });
          const text = affiliateText({
            aid,
            displayName: displayName ?? email.replace(/@.*/, ""),
            email,
          });

          sendMail({
            to: email,
            subject: "Vurtos.com - Affiliate Program",
            html,
            text,
          })
            .then(() => {
              return onSuccess({
                _id: result._id,
                isActive: false,
                affiliations,
                websiteName,
                websiteUrl,
                industry,
                promoCode,
              });
            })
            .catch((err) => returnError({ err, aid }));
        })
        .catch((err) => returnError({ err, aid }));
    })
    .catch(onError);
});

export default router;
