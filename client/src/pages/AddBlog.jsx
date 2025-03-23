import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddBlog = () => {
  const { formData, setFormData, setIsEdit, isEdit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmitBlog() {
    try {
      const blogId = location.state?.getCurrentBlog?._id; // Safely access blog ID
      const res = isEdit
        ? await axios.put(`http://localhost:3000/api/blogs/update/${blogId}`, {
            title: formData.title,
            description: formData.description,
          })
        : await axios.post("http://localhost:3000/api/blogs/add", {
            title: formData.title,
            description: formData.description,
          });

      const result = res.data; // Access parsed response data
      // console.log("Response from server:", result); // Debug log

      if (result) {
        setIsEdit(false)
        setFormData({ title: "", description: "" });
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting blog:", error.response || error.message);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmitBlog();
    }
  }

  useEffect(() => {
    // console.log(location);
    if (location.state) {
      const { getCurrentBlog } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlog.title,
        description: getCurrentBlog.description,
      });
    }
  }, [location]);

  return (
    <div className="p-7">
      <h1 className="text-2xl font-semibold">
        {isEdit ? "Edit a Blog" : "Add a Blog"}
      </h1>
      <div className="">
        <input
          name="title"
          placeholder="Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full my-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 w-full my-2"
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSubmitBlog}
          className="border-1 p-2 cursor-pointer hover:scale-120 duration-300 ease-in-out"
        >
          {isEdit ? "Edit Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;