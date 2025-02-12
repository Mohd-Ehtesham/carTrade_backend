const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1886,
  },
  images: [{ type: String }],

  fuelType: {
    type: String,
    required: true,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
  },
  transmission: {
    type: String,
    required: true,
    enum: ["Automatic", "Manual"],
  },
  mileage: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  features: {
    type: [String],
    required: true,
  },
  description: { type: String, required: true },
  owner: {
    name: { type: String, required: true },
    contact: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, // Basic email validation
    },
    phone: {
      type: String,
      required: true,
    },
  },
  vin: {
    type: String,
    required: true,
    unique: true,
  },
  condition: {
    type: String,
    required: true,
    enum: ["New", "Used"],
  },
  dateListed: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.models.Car || mongoose.model("Car", carSchema);
