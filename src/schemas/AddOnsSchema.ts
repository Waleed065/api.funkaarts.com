import { Schema, connection } from "mongoose";

const AddOnsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true
    }
  },
  {
    versionKey: false 
  }
);


const AddOns = connection.model("add_ons", AddOnsSchema);
export default AddOns;
