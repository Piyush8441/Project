const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password Must be at least 5 Character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// router.post(
//   "/loginuser",
//   [
//     body("email").isEmail().withMessage("Invalid email format"),
//     body("password")
//       .isLength({ min: 5 })
//       .withMessage("Password Must be at least 5 Character"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let email = req.body.email;
//     try {
//       let userData = await User.findOne({ email });
//       if (!userData) {
//         return res.status(400).json({ errors: "Invalid Credentials" });
//       }
//       if (req.body.password !== userData.password) {
//         return res.status(400).json({ errors: "Invalid Credentials" });
//       } else {
//         return res.json({ success: true });
//       }
//     } catch (error) {
//       console.log(error);
//       res.json({ success: false });
//     }
//   }
// );
module.exports = router;
