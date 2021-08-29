import { Schema, connection } from "mongoose";

const ordersSchema = new Schema(
  {
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
    itemId: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    addOns: {
      type: [
        {
          title: String,
          price: Number,
          quantity: Number
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false 
  }
);

// const database = connection.useDb("services");

const Orders = connection.model("orders", ordersSchema);
export default Orders
