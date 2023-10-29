import axios from 'axios'
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE
} from './blogTypes'

export const fetchBlogs = () => {
  return (dispatch) => {
    dispatch(fetchBlogsRequest())
    axios
      .get('http://localhost:3004/posts')
      .then(response => {
        // response.data is the blogs
        const blogs = response.data
        dispatch(fetchBlogsSuccess(blogs))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchBlogsFailure(error.message))
      })
  }
}

export const fetchBlog = (id) => {
  return (dispatch) => {
    dispatch(fetchBlogsRequest())
    axios
      .get(`http://localhost:3004/posts/${id}`)
      .then(response => {
        // response.data is the blogs
        const blogs = response.data
        dispatch(fetchBlogsSuccess(blogs))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchBlogsFailure(error.message))
      })
  }
}

export const fetchBlogsRequest = () => {
  return {
    type: FETCH_BLOGS_REQUEST
  }
}

export const fetchBlogsSuccess = blogs => {
  return {
    type: FETCH_BLOGS_SUCCESS,
    payload: blogs
  }
}

export const fetchBlogsFailure = error => {
  return {
    type: FETCH_BLOGS_FAILURE,
    payload: error
  }
}
