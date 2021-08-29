import nodemailer from "nodemailer";
import { google } from "googleapis";

const clientId =
  "xxxx";
const clientSecret = "xxxx";
const REDIRECT_URI = "xxxx";
const refreshToken =
  "xxxx";

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "example@gmail.com",
    clientId,
    clientSecret,
    refreshToken,
    // accessToken,
  },
});

interface schema {
  to: string;
  subject: string;
  text: string;
  html: string;
}
export default async function sendMail({
  to,
  subject,
  text,
  html
}: schema) {
  const mailOptions = {
    from: "From",
    to,
    subject,
    text,
    html,
  };
  try {
    // const accessToken = await oAuth2Client.getAccessToken() as string;
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
}
