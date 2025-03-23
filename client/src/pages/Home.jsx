import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogList, setBlogList, pending, setPending, isEdit, setIsEdit } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const res = await axios.get("http://localhost:3000/api/blogs");
    const result = await res.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setBlogList([]);
      setPending(false);
    }
  }
  // console.log(pending, blogList.blogList);

  async function handleDeleteBlog(getCurrentId) {
    // console.log(getCurrentId);
    const res = await axios.delete(
      `http://localhost:3000/api/blogs/delete/${getCurrentId}`
    );
    const result = await res.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  async function handleUpdateBlog(getCurrentBlog) {
    navigate('/add-blog', {state: {getCurrentBlog}})
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className="p-7">
      <h1 className="text-2xl font-semibold">Blog List</h1>
      {pending ? (
        <h1>Loading....</h1>
      ) : (
        <div className="grid grid-cols-4 gap-2.5 mt-4">
          {blogList && blogList.length > 0 ? (
            blogList.map((item) => (
              <div
                key={item._id}
                className="p-2.5 border border-red-400 rounded-md"
              >
                <div>
                  <p className="font-semibold capitalize underline">{item.title}</p>
                  <p>{item.description}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <FaEdit
                    className="cursor-pointer"
                    onClick={() => handleUpdateBlog(item)}
                    size={20}
                  />
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => handleDeleteBlog(item._id)}
                    size={20}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>No blog has added yet!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
