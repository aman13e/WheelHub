import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import carsRoute from "./routes/carRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to WheelHub");
});

app.use("/cars", carsRoute);
app.use("/users", userRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
