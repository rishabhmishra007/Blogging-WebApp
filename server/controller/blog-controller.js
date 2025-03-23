const mongoose = require("mongoose");
const Blog = require("../model/Blog");

// fetch list of blogs
// add a new blog
// update a blog
// delete a blog

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
    if (!blogList) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogList });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No blogs found" });
  }
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please provide title and description" });
  }

  const currentDate = new Date();
  const newlyCreateBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreateBlog.save({ session });
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ newlyCreateBlog });
  } catch (e) {
    return res
      .status(500)
      .json({ error: e.message, message: "Blog not created" });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please provide title and description" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ updatedBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Blog not found" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Please provide id" });
    }
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Blog not found" });
  }
};

module.exports = {
  fetchListOfBlogs,
  addNewBlog,
  updateBlog,
  deleteBlog,
};
