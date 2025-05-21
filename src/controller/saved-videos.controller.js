import blogModel from "../models/blog.model.js";
import savedModel from "../models/saved.model.js";
import userModel from "../models/user.model.js";

const getAllSavedVideos = async (req, res) => {
  try {
    const userId = req.user.id;

    const saved = await savedModel.find({ userId });

    const savedBlogId = saved.map((save) => save.blogId);

    const savedVideos = await blogModel
      .find({
        _id: { $in: savedBlogId },
      })
      .sort({ createdAt: -1 });

    const user = await userModel.findById(userId);

    res.render("saved-videos", {
      username: user.username,
      blogs: savedVideos,
    });
  } catch (error) {
    console.log(error.message);
    res.render("error", { status: 500, message: "Interval server error" });
  }
};

export default { getAllSavedVideos };
