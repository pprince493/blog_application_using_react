import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE
} from './blogTypes'

const initialState = {
  loading: false,
  blogs: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
        error: ''
      }
    case FETCH_BLOGS_FAILURE:
      return {
        loading: false,
        blogs: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer
