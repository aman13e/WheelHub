import { Router } from "express";
import Car from "../models/carModel.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Unauthorized");
    }

    req.user = user;
    next();
  });
};

const router = Router();

//route for creating new car
router.post("/", verifyToken, async (req, res) => {
  try {
    if (!req.body.model || !req.body.price || !req.body.manufacturingYear) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newCar = {
      model: req.body.model,
      price: req.body.price,
      manufacturingYear: req.body.manufacturingYear,
    };

    const car = await Car.create(newCar);

    return res.status(201).send({ message: "Car created successfully", car });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

//rout for getting all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    return res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

//route for getting single car
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }

    return res.status(200).send(car);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

//route for updating cars
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (!req.body.model || !req.body.price || !req.body.manufacturingYear) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const { id } = req.params;

    const car = await Car.findByIdAndUpdate(id, req.body);

    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }

    return res.status(200).send({ message: "Car updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//route for deleting cars
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }
    return res.status(200).send({ message: "Car deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

export default router;
