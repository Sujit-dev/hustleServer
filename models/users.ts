import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    default: new Date().toDateString(),
  },
  gender: {
    type: String,
    default: "male",
  },
  image: {
    type: String,
    default: "",
  },
  type: {
    type: Number,
    default: 0,
  },
  saved: {
    type: [String],
    default: [],
  },
  coins: {
    type: Number,
    default: 10,
  },
  city: {
    type: String,
    default: "bangalore",
  },
  pinCode: {
    type: Number,
    default: "560093",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
});

const users = mongoose.model("users", usersSchema);

export default users;
