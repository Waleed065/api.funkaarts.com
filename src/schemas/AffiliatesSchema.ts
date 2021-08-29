import { Schema, connection } from "mongoose";

const pendingAffiliatesSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false
    },
    identityPictures: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length === 2,
        message: "Identity pictures length needs to be of 2",
      },
    },
    affiliations: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length >= 1 && arr.length <= 3,
        message:
          "Affiliations need to be minimum of length 1 and maximum of length 3.",
      },
    },
    websiteName: {
        type: String,
        required: true,
    },
    websiteUrl: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true
    },
    promoCode: {
        type: String,
        default: null
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => new Date(),
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const pending_affiliates = connection.model(
  "affiliates",
  pendingAffiliatesSchema
);
export default pending_affiliates;
