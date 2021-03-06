const router = require("express").Router();
const Feed = require("../Models/imgconfig");
const verify = require("../Service/verify");
const imgUpload = require("../imgfile");

router.post("/upload", verify, imgUpload, async (req, res) => {
  console.log("first");
  if (req.file) {
    return res.status(200).send({
      success: true,
      message: req.file,
    });
  } else {
    return res.status(400).send({
      success: false,
      message: "something went wrong ",
    });
  }
});

// post router for feed post

router.post("/post", imgUpload, async (req, res) => {
  const feed = new Feed({
    img: req.file.filename,
    caption: req.body.caption,
  });
  try {
    const updatepost = await feed.save();
    return res.send({
      success: true,
      message: "Post Inserted successfully",
      updatepost,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err,
    });
  }
});

//
//localhost:8080/?page=1&limit=3000
http: router.get("/", async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.limit);

  console.log(page + "......" + size);
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const allpost = await Feed.find().limit(limit).skip(skip);
  if (allpost) {
    return res.json({
      status: true,
      message: "post retrived successfully",
      post: allpost,
    });
  } else {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
});

//
router.put("/:Id", verify, imgUpload, async (req, res) => {
  try {
    const Updated = await Feed.findOneAndUpdate(
      { _id: req.params.Id },
      {
        $set: {
          img: req.file.filename,
          caption: req.body.caption,
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
      .json({ status: true, message: "One Post Updtaed", post: Updated });
  } catch (err) {
    return res.status(400).json({ status: false, message: err });
  }
});

router.put("/like/:id", async (req, res) => {
  const userid = req.body.id;
  const userComment = req.body.comment || "";
  try {
    const users = await Feed.findOne({ _id: req.params.id });
    if (!users) return res.status(400).json({ status: false, users });

    if (userComment === "") {
      users.like.length === 0
        ? users.like.push(userid)
        : users.like.map((ele, index) => {
            ele._id === userid
              ? users.like.splice(index, 1)
              : users.like.push(userid);
          });
    } else users.comment.push({ userId: userid, comment: userComment });

    console.log(users);

    const saved = await users.save();
    if (saved)
      return res.status(200).json({
        status: true,
        user: users,
        like: users.like.length,
        comment: users.comment,
      });
    else
      return res.status(400).json({
        status: false,
        message: "data not saved",
      });
  } catch (err) {
    return res.status(400).json({ status: false, message: err });
  }
});

//
router.delete("/:Id", verify, async (req, res) => {
  try {
    const Deletedpost = await Feed.findOneAndRemove({ _id: req.params.Id });
    if (!Deletedpost)
      return res
        .status(400)
        .json({ status: false, message: "post not exist!!" });
    return res.status(200).json({
      status: true,
      message: "Post Deleted successfully",
      Deletedpost,
    });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
});

module.exports = router;
