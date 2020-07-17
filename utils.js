const {Goal, Bookmark, User} = require('./server/db/models')

//Check if the user logged in is the user on goals
const checkIfUserHasGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findOne({
      where: {
        id: req.params.id
      }
    })
    const userIdOnGoal = goal.dataValues.userId

    if (req.user.dataValues.id !== userIdOnGoal) {
      throw new Error('Goal not found!')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

//check if use has this bookmark
const checkIfUserHasBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOne({
      where: {
        id: req.params.id
      }
    })
    const userIdOnBookmark = bookmark.dataValues.userId

    if (req.user.dataValues.id !== userIdOnBookmark) {
      throw new Error('Bookmark not found!')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

//check if user is the same as the user logged in
const checkIfUserIsUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    const loggedInUserId = user.dataValues.userId

    if (req.user.dataValues.id !== loggedInUserId) {
      throw new Error('You are not this user!!')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

function checkIfAdmin(user) {
  return user.isAdmin
}

const cleanUrl = url => {
  if (url.length > 30) {
    url = url.slice(0, 30)
  } else {
    url = url.slice()
  }
  return `${url}...`
}

module.exports = {
  checkIfAdmin,
  checkIfUserHasGoal,
  checkIfUserHasBookmark,
  checkIfUserIsUser,
  cleanUrl
}
