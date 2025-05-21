import likeModel from "../models/like.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";


const addLike = async (req, res, next) => {
  try {
    const {userId, blogId} = req.body;

    const existingLike = await likeModel.findOne({ userId, blogId})

    if (existingLike) {
      throw new ErrorHandler(404, "Siz allaqachon like bosgansiz!")
    }

    await likeModel.create({userId, blogId});

    res.send({
      status: "success",
      message: "like bosildi"
    });
  } catch (error) {
    next(error)
  }
}

const deleteLike = async (req, res, next) => {
  try {
    const {userId, blogId} = req.body;

    if (!userId || !blogId) {
      return res.status(400).json({ message: "userId va blogId kerak!" });
    }

    const foundedId = await likeModel.findOne({userId, blogId})

    if(!foundedId){
      throw new ErrorHandler(404, "like not found")
    }

    await likeModel.findByIdAndDelete(foundedId._id)

    res.send({
      status: "success",
      message: "like uchirildi"
    });
  } catch (error) {
    next(error)
  }
}


export default {addLike, deleteLike}