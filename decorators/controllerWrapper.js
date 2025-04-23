const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        error.status = 409
      }

      if (error.name === 'SequelizeValidationError') {
        error.status = 400
        error.message = 'Помилка від Joi або іншої бібліотеки валідації'
      }

      next(error)
    }
  }
}

export default controllerWrapper
