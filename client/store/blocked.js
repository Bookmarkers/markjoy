/* eslint-disable no-alert */
import axios from 'axios'

const GET_BLOCKED = 'GET_BLOCKED'
const ADD_BLOCKED = 'ADD_BLOCKED'
const REMOVE_BLOCKED = 'REMOVE_BLOCKED'

const gotBlocked = blocked => ({type: GET_BLOCKED, blocked})
const addedBlocked = blocked => ({type: ADD_BLOCKED, blocked})
const removedBlocked = id => ({type: REMOVE_BLOCKED, id})

export const fetchBlocked = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/blocked/user/${userId}`)
    if (data) {
      dispatch(gotBlocked(data))
    } else {
      dispatch(gotBlocked({}))
    }
  } catch (err) {
    console.error(err)
  }
}

export const addBlocked = (userId, blockedInfo) => async dispatch => {
  try {
    const urlDivided = blockedInfo.url.split('.')
    const isUrl = urlDivided.length > 1
    if (!isUrl) {
      alert('Please type in correct url!')
    } else {
      const {data} = await axios.post(
        `/api/blocked/user/${userId}`,
        blockedInfo
      )
      if (data) {
        dispatch(addedBlocked(data))
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeBlocked = (userId, blockedId) => async dispatch => {
  try {
    await axios.delete(`/api/blocked/user/${userId}/${blockedId}`)
    dispatch(removedBlocked(blockedId))
  } catch (err) {
    console.error(err)
  }
}

const initialState = []

export default function blockedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BLOCKED:
      return action.blocked
    case ADD_BLOCKED:
      return [...state, action.blocked]
    case REMOVE_BLOCKED:
      return [...state].filter(blocked => blocked.id !== action.blockedId)
    default:
      return state
  }
}
