const router = require("express").Router();
const Joi = require("joi");
const User = require("../Models/config");
const imgUpload = require("../imgfile");
const { verify } = require("jsonwebtoken");

const Editschema = Joi.object({
  firstname: Joi.string().min(4),
  lastname: Joi.string().min(4),
  biodata: Joi.string().min(4),
  gender: Joi.string(),
  dateofbirth: Joi.date(),
  email: Joi.string().min(6).email(),
  mobile: Joi.number(),
});

//
router.put("/edit-profile/:UserId", verify, imgUpload, async (req, res) => {
  try {
    const value = await Editschema.validateAsync(req.body);
    const Updated = await User.findOneAndUpdate(
      { _id: req.params.UserId },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          biodata: req.body.biodata,
          gender: req.body.gender,
          dateofbirth: req.body.dateofbirth,
          mobile: req.body.mobile,
          email: req.body.email,
          img: req.file.filename,
        },
      },
      { new: true }
    );
    if (!Updated)
      return res
        .status(400)
        .json({ status: false, message: "User not exist!!" });

    return res
      .status(200)
      .json({ status: true, message: "One User Updtaed", Updated });
  } catch (err) {
    return res.status(400).json({ status: false, message: err });
  }
});
// default API for edit

router.get("/profile/:id", verify, async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id });
    return res.status(200).json({ status: true, users });
  } catch (err) {
    return res.status(400).json({ status: false, message: err });
  }
});

router.get("/All", async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ status: true, users });
});

module.exports = router;
