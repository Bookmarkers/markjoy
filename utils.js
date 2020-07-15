//Check if the user logged in is the user on goals
const checkIfUser = async (req, res, next) => {
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

module.exports = {
  checkIfAdmin,
  checkIfUser,
  checkIfUserHasBookmark,
  checkIfUserIsUser
}
