import timeAgo from "../helpers/timeAgo.js";
import blogModel from "../models/blog.model.js";
import likeModel from "../models/like.model.js";


const getAllvideos = async (req, res, next) => {
  try {

    const allData = await blogModel.find().sort({ createdAt: -1});

    const blogIds = allData.map(blog => blog._id);

    const likes = await likeModel.find({ blogId: { $in: blogIds } }).populate("userId");

    let data = allData.map(blog => {

      const blogLikes = likes.filter(like => like.blogId.toString() === blog._id.toString());

      const likeUsers = blogLikes
      .filter(like => like.userId)
      .map(like => ({
        image: like.userId.imageUrl
      }));
    

      return {
        ...blog.toObject(),
        likeCount: likeUsers ? likeUsers.length : 0
      };
    });

    const imagesUrls = data.map(img => ({
      imageUrl: img.imageUrl,
      likeCount: img.likeCount,
      id: img._id,
      user_id: img.user_id
    }));

    const videoKeys = ['mp4', 'MOV', 'MP4']

    const videos = imagesUrls.filter(video => {

      if(videoKeys.includes(video.imageUrl.split(".")[1])){
        return video
      }
    });

    
    res.render("shorts-video", {videos});
  } catch (error) {
    next(error)
  }
}

export default { getAllvideos };