const router = require("express").Router();
const User = require("../modules/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    confirmPassword: CryptoJS.AES.encrypt(
      req.body.confirmPassword,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong credentials!");
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
      if (OriginalPassword !== req.body.password) {
        res.status(401).json("Wrong credentials!");
      } else {
        const { password, confirmPassword, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;