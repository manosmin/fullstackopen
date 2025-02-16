import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload;

      state.push(content);
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload;
      const updatedState = state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
      return updatedState.sort((a, b) => b.likes - a.likes);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { createBlog, likeBlog, appendBlog, setBlogs, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export const addLikeToBlog = (likedBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateLikes(likedBlog.id, {
        ...likedBlog,
        likes: likedBlog.likes + 1,
      });
      dispatch(likeBlog(updatedBlog));
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export default blogSlice.reducer;
