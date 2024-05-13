import { User, Student_details } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const signup = async (req, res) => {
  try {
    const { name, department, username, email, password } = req.body;

    let user = await User.findOne({ username });

    if (user)
      return res.status(201).json({
        success: false,
        message: "User Already exists.",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      department,
      username,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user)
      return res.status(201).json({
        success: false,
        message: "Invalid Registration Number.",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(201).json({
        success: false,
        message: "Invalid Password.",
      });
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    console.log(error);
  }
};

// export const insertStudentDetails = async (req, res) => {
//   try {
//     const { username, email, department } = req.body;
//     let user = await Student_details.findOne({ username, email, department });
//     if(user)
//       return res.status(201).json({
//         success: false,
//         message:
//           "Already registered with LPU",
//       });

    
//     user = await Student_details.create({
//       username,
//       email,
//       department,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Inserted Successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const checkForAuthenticStudent = async (req, res) => {
//   try {
//     const { department, username, email } = req.body;

//     const user = await Student_details.findOne({ username, email, department });
//     console.log(user);
//     if (!user)
//       return res.status(201).json({
//         success: false,
//         message:
//           "Your Registration Number, Email or Department does not match with LPU records.",
//       });

//     res.status(200).json({
//       success: true,
//       message: "An authentic student of LPU.",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
