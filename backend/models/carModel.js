import mongoose, { Schema, Types } from "mongoose";

const carSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Schema.Types.Mixed,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
