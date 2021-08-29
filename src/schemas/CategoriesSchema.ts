import { Schema, connection } from "mongoose";

const ItemsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },

  },
  {
    versionKey: false 
  }
);


// const database = connection.useDb("services");

const Categories = connection.model("categories", ItemsSchema);
export default Categories;
