import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign(
    { _id: user._id },
    "cd@heijehrrr3r234454^gfeer3&3298434r#4r438yr8",
    { expiresIn: "60m" }
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      token,
      name: user.name,
      department: user.department,
    });
};
