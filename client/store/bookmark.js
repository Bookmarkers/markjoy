/* eslint-disable no-alert */
import axios from 'axios'

const SET_BOOKMARKS = 'SET_BOOKMARKS'
const ADD_BOOKMARK = 'ADD_BOOKMARK'
const DELETE_BOOKMARK = 'DELETE_BOOKMARK'

export const setBookmarks = bookmarks => ({
  type: SET_BOOKMARKS,
  bookmarks
})

export const fetchBookmarks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/bookmarks')
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
    if (!bookmarkInfo.title) {
      alert('Title is a required field!')
    } else {
      const {data} = await axios.post('/api/bookmarks', bookmarkInfo)
      dispatch(addedBookmark(data))
    }
  } catch (error) {
    console.error('There was a problem creating a new bookmark!', error)
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

const initialState = []

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKMARKS:
      return action.bookmarks
    case ADD_BOOKMARK:
      return [...state, action.bookmark]
    case DELETE_BOOKMARK:
      return [...state].filter(bookmark => bookmark.id !== action.bookmarkId)
    default:
      return state
  }
}
