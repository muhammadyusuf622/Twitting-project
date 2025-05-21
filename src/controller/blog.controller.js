import blogModel from "../models/blog.model.js";

const showAddBlogForm = (req, res) => {
  try {
    res.render("add-blog");
  } catch (error) {
    res.render("error", {
      status: 400,
      message: "Please try again later!",
    });
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const imageUrl = req.file ? "/uploads/" + req.file.filename : "";

    if (!title || !content) {
      return res.render("error", {
        status: 400,
        message: "Request not completed. Title and content are required!",
      });
    }

    const newBlog = new blogModel({
      user_id: id,
      title,
      content,
      imageUrl: imageUrl,
    });
    await newBlog.save();

    res.redirect("/home");
  } catch (error) {
    res.render("error", {
      status: 500,
      message: "Please try again later!",
    });
  }
};

export default { showAddBlogForm, addBlog };
