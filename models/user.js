import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
  name: String,
  department: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Student_details_schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  department: {
    type: String,
  },
});

export const User = mongoose.model("User", user_schema);
export const Student_details = mongoose.model(
  "Student_details",
  Student_details_schema
);
