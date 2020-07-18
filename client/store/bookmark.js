/* eslint-disable no-alert */
import axios from 'axios'

const SET_SINGLE_BOOKMARK = 'SET_SINGLE_BOOKMARK'
const SET_BOOKMARKS = 'SET_BOOKMARKS'
const ADD_BOOKMARK = 'ADD_BOOKMARK'
const DELETE_BOOKMARK = 'DELETE_BOOKMARK'
const UPDATE_BOOKMARK = 'UPDATE_BOOKMARK'

export const setSingleBookmark = bookmark => ({
  type: SET_SINGLE_BOOKMARK,
  bookmark
})

export const fetchSingleBookmark = bookmarkId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/bookmarks/${bookmarkId}`)
    if (data) {
      dispatch(setSingleBookmark(data))
    } else {
      dispatch(setSingleBookmark({}))
    }
  } catch (error) {
    console.error('There was a problem fetching a bookmark!', error)
  }
}

export const setBookmarks = bookmarks => ({
  type: SET_BOOKMARKS,
  bookmarks
})

export const fetchBookmarks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/bookmarks')
    if (data) {
      dispatch(setBookmarks(data))
    } else {
      dispatch(setBookmarks([]))
    }
  } catch (error) {
    console.error('There was a problem fetching bookmarks!', error)
  }
}

export const fetchBookmarksByGoal = goalId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/bookmarks/goal/${goalId}`)
    dispatch(setBookmarks(data))
  } catch (error) {
    console.error('There was a problem fetching bookmarks!', error)
  }
}

export const fetchBookmarksByCategory = categoryId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/bookmarks/category/${categoryId}`)
    dispatch(setBookmarks(data))
  } catch (error) {
    console.error('There was a problem fetching bookmarks!', error)
  }
}

export const addedBookmark = bookmark => ({
  type: ADD_BOOKMARK,
  bookmark
})

export const addBookmark = bookmarkInfo => async dispatch => {
  try {
    const {data} = await axios.post('/api/bookmarks', bookmarkInfo)
    dispatch(addedBookmark(data))
  } catch (error) {
    console.error('There was a problem creating a new bookmark!', error)
  }
}

export const updatedBookmark = (bookmarkId, updateInfo) => ({
  type: UPDATE_BOOKMARK,
  bookmarkId,
  updateInfo
})

export const updateBookmark = (bookmarkId, updateInfo) => async dispatch => {
  try {
    await axios.put(`/api/bookmarks/${bookmarkId}`, updateInfo)
    dispatch(updatedBookmark(bookmarkId, updateInfo))
  } catch (error) {
    console.error('There was a problem updating a new bookmark!', error)
  }
}

export const deletedBookmark = bookmarkId => ({
  type: DELETE_BOOKMARK,
  bookmarkId
})

export const deleteBookmark = bookmarkId => async dispatch => {
  try {
    await axios.delete(`/api/bookmarks/${bookmarkId}`)
    dispatch(deletedBookmark(bookmarkId))
  } catch (error) {
    console.error('There was a problem deleting the bookmark!', error)
  }
}

const initialState = {loading: true, bookmarks: [], selectedBookmark: {}}

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_BOOKMARK:
      return {...state, loading: false, selectedBookmark: action.bookmark}
    case SET_BOOKMARKS:
      return {...state, loading: false, bookmarks: action.bookmarks}
    case ADD_BOOKMARK:
      return {
        ...state,
        loading: false,
        bookmarks: [...state.bookmarks, action.bookmark]
      }
    case UPDATE_BOOKMARK:
      return {
        ...state,
        loading: false,
        bookmarks: [...state.bookmarks].map(bookmark => {
          if (bookmark.id === action.bookmarkId) {
            return {...bookmark, ...action.updateInfo}
          } else {
            return bookmark
          }
        })
      }
    case DELETE_BOOKMARK:
      return {
        ...state,
        loading: false,
        bookmarks: [...state.bookmarks].filter(
          bookmark => bookmark.id !== action.bookmarkId
        )
      }
    default:
      return state
  }
}
