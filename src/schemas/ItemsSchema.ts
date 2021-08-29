import { Schema, connection } from "mongoose";

const ItemsSchema = new Schema(
  {
    location: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr: number[]) => arr.length === 2,
        message: "{PATH} length needs to be of 2",
      },
    },
    userId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    countryId: {
      type: String,
      required: true,
    },
    cityId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arrayLimit({ arr, length: 5 }),
        message: "{PATH} exceeds the limit of 5",
      },
    },
    addOns: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          about: {
            type: Schema.Types.Mixed,
            required: true,
          },
        },
      ],
      required: true,
    },

    premium: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    pictures: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arrayLimit({ arr, length: 15 }),
        message: "{PATH} exceeds the limit of 15",
      },
    },
    amenities: {
      type: [String],
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    rating: {
      type: {
        fiveStar: {
          type: Number,
          required: true,
        },
        fourStar: {
          type: Number,
          required: true,
        },
        threeStar: {
          type: Number,
          required: true,
        },
        twoStar: {
          type: Number,
          required: true,
        },
        oneStar: {
          type: Number,
          required: true,
        },
      },
      required: true,
    },
    averageRating: {
      type: Number,
      required: true,
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

function arrayLimit({ arr, length }: { arr: any[]; length: number }) {
  return arr.length <= length;
}

// const database = connection.useDb("services");

const Items = connection.model("items", ItemsSchema);
export default Items;
