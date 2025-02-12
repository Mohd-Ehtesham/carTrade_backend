const express = require("express");

const {
  getCars,
  addNewCar,
  getCarById,
  updateCarById,
  deleteCarById,
  compareCars,
} = require("../controllers/carController");

const router = express.Router();

// car end-points
router.post("/car", addNewCar);
router.get("/allCars", getCars);
router.get("/car/:id", getCarById);
router.patch("/car/:id", updateCarById);
router.delete("/car/:id", deleteCarById);

// comparing car end-points
router.post("/compare", compareCars);
router.get("/compare", compareCars);

module.exports = router;
