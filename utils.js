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

function checkIfAdmin(user) {
  return user.isAdmin
}

module.exports = {
  checkIfAdmin,
  checkIfUser
}
