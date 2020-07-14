import axios from 'axios'

const SET_GOAL = 'SET_GOAL'

export const setGoal = (goal, error) => ({
  type: SET_GOAL,
  goal,
  error
})

export const getSingleGoal = id => async dispatch => {
  let res
  try {
    res = await axios.get(`/api/goals/${id}`)
    dispatch(setGoal(res.data))
  } catch (error) {
    dispatch(setGoal({}, error))
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_GOAL:
      if (!action.error) {
        return {goal: action.goal}
      } else {
        return {...state, error: action.error}
      }
    default:
      return state
  }
}
