import axios from 'axios'

const SET_GOAL = 'SET_GOAL'

export const setGoal = goal => ({
  type: SET_GOAL,
  goal
})

export const getSingleGoal = id => async dispatch => {
  const {data} = await axios.get(`/api/goals/${id}`)
  dispatch(setGoal(data))
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_GOAL:
      return {goal: action.goal}

    default:
      return state
  }
}
