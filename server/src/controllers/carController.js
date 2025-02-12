const { request } = require("express");
const Car = require("../models/carSchema");

const addNewCar = async (request, response) => {
  try {
    console.log("🔵 Incoming Registration request:", request.body);

    // Ensure images and make (brand) are provided
    if (!request.body.images || request.body.images.length === 0) {
      return response.status(400).json({ message: "Images are required." });
    }

    if (!request.body.make) {
      return response
        .status(400)
        .json({ message: "Car make (brand) is required." });
    }

    // Convert make (brand) name to lowercase and remove spaces (for folder naming)
    const folderName = request.body.make.toLowerCase().replace(/\s+/g, "");

    // Construct dynamic image paths based on the make/brand
    const imagePaths = request.body.images.map(
      (img) => `/images/${folderName}/${img}`
    );

    // Create a new car entry
    const newCar = new Car({
      ...request.body,
      images: imagePaths, // Store images with dynamic folder paths
    });

    // Save to the database
    const savedCar = await newCar.save();
    console.log("✅ Car Saved:", savedCar);

    response
      .status(201)
      .json({ message: "New car created successfully 🚗", savedCar });
  } catch (error) {
    console.error("❌ Error:", error);
    response.status(500).json({ success: false, message: error.message });
  }
};

const getCars = async (request, response) => {
  try {
    // finding all the cars
    const allCars = await Car.find();

    // Check if there are no cars
    if (allCars.length === 0) {
      return response.status(200).json({
        message: "No cars available in the database 🚗",
        totalCars: 0,
        allCars: [],
      });
    }

    // return response with cars data
    return response.status(200).json({
      message: "All cars are fetched successfully 🚔",
      totalCars: allCars.length,
      allCars,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    // return response with error
    response
      .status(400)
      .json({ message: "Failed to fetch all the cars", error });
  }
};

const getCarById = async (request, response) => {
  const id = request.params.id.trim();
  try {
    // finding car by id
    const carToGet = await Car.findById(id);

    // checking if car is exists or not
    if (!carToGet) {
      return response.status(404).json({
        message: `The car with the id ${id} was not found.`,
      });
    }

    // return response with car data
    return response
      .status(200)
      .json({ message: `The car with the id ${id} was  found.`, carToGet });
  } catch (error) {
    console.error("❌ Error:", error);
    // return response with error
    response
      .status(400)
      .json({ message: `Failed to fetch the car with id ${id}`, error });
  }
};

const updateCarById = async (request, response) => {
  const id = request.params.id.trim();
  try {
    // update car with new data
    const updatedCar = await Car.findByIdAndUpdate(id, request.body, {
      // Return the updated document
      new: true,
      // Ensure the new data is valid});
      runValidators: true,
    });

    if (!updatedCar) {
      return response.status(404).json({
        message: `The car with the id ${id} was not found.`,
      });
    }

    // sending response with updated Car
    return response
      .status(200)
      .json({ message: `Car with the id ${id} was updated`, updatedCar });
  } catch (error) {
    console.error("❌ Error:", error);
    // return response with error
    response
      .status(400)
      .json({ message: `Failed to update the car with id ${id}`, error });
  }
};

const deleteCarById = async (request, response) => {
  const id = request.params.id.trim();
  try {
    // delete car with id
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return response
        .status(400)
        .json({ message: `Car with the id ${id} was not deleted` });
    }

    // sending response with deleted car
    response
      .status(200)
      .json({ message: `Car with the id ${id} was deleted`, deletedCar });
  } catch (error) {
    console.error("❌ Error:", error);
    // return response with error
    response
      .status(400)
      .json({ message: `Failed to delete the car with id ${id}`, error });
  }
};

const compareCars = async (request, response) => {
  try {
    // Get car IDs from query params (for GET) or body (for POST)
    const carIds = request.query.ids
      ? request.query.ids.split(",") // Convert comma-separated string to an array
      : request.body.carIds;

    // Check if at least two IDs are provided
    if (!carIds || carIds.length < 2) {
      return response
        .status(400)
        .json({ message: "At least two car IDs are needed for comparison." });
    }

    // Fetch cars from the database
    const cars = await Car.find({ _id: { $in: carIds } });

    // Check if all requested cars exist
    if (cars.length < 2) {
      return response
        .status(404)
        .json({ message: "Some cars were not found." });
    }

    // Send response with fetched cars
    return response
      .status(200)
      .json({ message: "Cars fetched successfully for comparison", cars });
  } catch (error) {
    console.error("❌ Error:", error);
    return response
      .status(500)
      .json({ message: "Error fetching cars for comparison", error });
  }
};

module.exports = {
  addNewCar,
  getCars,
  getCarById,
  updateCarById,
  deleteCarById,
  compareCars,
};
