import timeAgo from "../helpers/timeAgo.js";
import blogModel from "../models/blog.model.js";
import commentModel from "../models/comment.model.js";
import likeModel from "../models/like.model.js";

const getAllData = async (req, res, next) => {
  try {
    let allBlogs = await blogModel.find().sort({ createdAt: -1 }).populate("user_id");

    const blogIds = allBlogs.map(blog => blog._id);

    const likes = await likeModel.find({ blogId: { $in: blogIds } }).populate("userId");

    let data = allBlogs.map(blog => {

      const blogLikes = likes.filter(like => like.blogId.toString() === blog._id.toString());

      const likeUsers = blogLikes
      .filter(like => like.userId)
      .map(like => ({
        username: like.userId.username,
        email: like.userId.email,
        image: like.userId.imageUrl
      }));
    

      return {
        ...blog.toObject(),
        createdAt: timeAgo(blog.createdAt),
        likes: likeUsers,
        likeCount: likeUsers ? likeUsers.length : 0
      };
    });


    const comments = await commentModel.find({ blogId: { $in: blogIds } }).sort({ createdAt: -1 }).populate("userId");

      data = allBlogs.map(blog => {
      const blogLikes = likes.filter(like => like.blogId.toString() === blog._id.toString());
      const likeUsers = blogLikes
        .filter(like => like.userId)
        .map(like => ({
          username: like.userId.username,
          email: like.userId.email,
          image: like.userId.imageUrl
        }));
    
      const blogComments = comments.filter(comment => comment.blogId.toString() === blog._id.toString());
    
      const formattedComments = blogComments.map(comment => ({
        username: comment.userId?.username || "Deleted user",
        image: comment.userId?.imageUrl || null,
        comment: comment.comment,
        createdAt: timeAgo(comment.createdAt)
      }));
    
      return {
        ...blog.toObject(),
        createdAt: timeAgo(blog.createdAt),
        likes: likeUsers,
        likeCount: likeUsers.length,
        comments: formattedComments,
        commentCount: formattedComments.length
      };
    });
    

    const userInfo = req.user;

    res.render("index", { data, userInfo });
  } catch (error) {
    next(error);
  }
};

export default { getAllData };
