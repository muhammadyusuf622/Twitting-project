import savedModel from "../models/saved.model.js";

const addSaved = async (req, res, next) => {
  try {
    const { userId, blogId } = req.body;

    const exists = await savedModel.findOne({ userId, blogId });
    if (exists) {
      return res.send({
        status: "warning",
        message: "Allaqachon saqlangan",
      });
    }

    await savedModel.create({ userId, blogId });
    res.send({
      status: "success",
      message: "Saqlangan",
    });
  } catch (error) {
    console.log(error.message);
    res.render("error", { status: 500, message: "Interval server error" });
  }
};


const deleteSaved = async (req, res, next) => {
  try {
    const { userId, blogId } = req.body;

    if (!userId || !blogId) {
      return res.render("error", {
        status: 400,
        message: "You need a register",
      });
    }

    const deleted = await savedModel.findOneAndDelete({ userId, blogId });

    if (!deleted) {
      return res.render("error", {
        status: 400,
        message: "Saved video not found",
      });
    }

    res.send({
      status: "success",
      message: "like o'chirildi",
    });
  } catch (error) {
    console.log(error.message);
    res.render("error", { status: 500, message: "Interval server error" });
  }
};


export default { addSaved, deleteSaved };
