import { Schema, connection } from "mongoose";

const PendingItemsSchema = new Schema(
  {
    location: {
      type: [Number],
      required: true,
      validate: {
        validator: (e: any) => arrayLimit({ e, length: 2 }),
        message: "{PATH} exceeds the limit of 2",
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
      default: false
    },
    keywords: {
      type: [String],
      required: true,
      validate: {
        validator: (e: any) => arrayLimit({ e, length: 6 }),
        message: "{PATH} exceeds the limit of 10",
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
        validator: (e: any) => arrayLimit({ e, length: 15 }),
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

      default: {
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      },
    },
    averageRating: {
      type: Number,
      required: true,
      default: 0
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

    }
  },
  {
    timestamps: true,
    versionKey: false 
  }
);

function arrayLimit({ e, length }: { e: number[]; length: number }) {
  return e.length <= length;
}

// const database = connection.useDb("services");

const Items = connection.model("pending_items", PendingItemsSchema);
export default Items
