import { Schema, connection } from "mongoose";

const HeadingsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    calendarHeadingOne: {
      type: String,
      required: true,
    },
    calendarHeadingTwo: {
      type: String,
      required: true,
    },
    categoriesHeading: {
      type: String,
      required: true,
    },
    itemsHeading: {
      type: String,
      required: true,
    },
    locationHeadingOne: {
      type: String,
      required: true,
    },
    locationHeadingTwo: {
      type: String,
      required: true,
    },
    timeHeadingOne: {
      type: String,
      required: true,
    },
    timeHeadingTwo: {
      type: String,
      required: true,
    },
    pictures: {
      type: [String],
      required: true,
      validate: {
        validator: (e: any) => arrayLimit({ e, length: 5 }),
        message: "{PATH} exceeds the limit of 5",
      },
    },
  },
  {
    versionKey: false 
  }
);

function arrayLimit({ e, length }: { e: number[]; length: number }) {
  return e.length <= length;
}

// const database = connection.useDb("services");

const Headings = connection.model("headings", HeadingsSchema);
export default Headings;
