import timeAgo from "../helpers/timeAgo.js";
import commentModel from "../models/comment.model.js";
import userModel from "../models/user.model.js";


const addComment = async (req, res, next) => {
  try {
    
    const {userId, blogId, comment} = req.body;

    if (!userId || !blogId || !comment ) {
      return res.status(400).json({ message: "userId va blogId, comment kerak!" });
    }

    await commentModel.create({userId, blogId, comment});

    res.send({
      message: "success"
    });
  } catch (error) {
    next(error)
  }
}

const setComment = async ({userId, blogId, comment}) => {

  try {

    if (!userId || !blogId || !comment ) {
      return res.status(400).json({ message: "userId va blogId, comment kerak!" });
    }

    const data = await commentModel.create({userId, blogId, comment});

    const foundUser = await userModel.findById(userId);

    const blog = {
      blogId: blogId,
      image: foundUser.imageUrl,
      email: foundUser.email,
      createdAt: timeAgo(data.createdAt),
      comment: data.comment
    }



    return blog
  } catch (error) {
    console.log('sokket yordamida comment yuborish-da xatolik ');
  }
}

export default {addComment, setComment};