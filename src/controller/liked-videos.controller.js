import blogModel from "../models/blog.model.js";
import likeModel from "../models/like.model.js";
import userModel from "../models/user.model.js";

const getAllLikedVideos = async (req, res) => {
  try {
    const userId = req.user.id;

    const likes = await likeModel.find({ userId: userId });

    const likedBlogId = likes.map((like) => like.blogId);

    const likedVideos = await blogModel
      .find({
        _id: { $in: likedBlogId },
      })
      .sort({ createdAt: -1 });

    const user = await userModel.findById(userId);

    res.render("liked-videos", {
      username: user.username,
      blogs: likedVideos,
    });
  } catch (error) {
    console.log(error.message);
    res.render("error", { status: 500, message: "Interval server error!" });
  }
};

export default { getAllLikedVideos };
