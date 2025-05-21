import ErrorHandler from "../utils/ErrorHandler.js"

const checkrole = (roles) => async (req, res, next) => {
  try {
    if(!roles.includes(req.user.role)){
       throw new ErrorHandler(400, `Bu rolega ${req.user.role} ruxsat yo'q`);
    }

    next();
  } catch (error) {
    next(error)
  }
}

export default checkrole;