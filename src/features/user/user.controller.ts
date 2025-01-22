import { Request, Response, NextFunction } from 'express'
import User from './user.model'
import Constant from '../../constant'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import errors from '../../common/error-handler'
import Configuration from '../../config'

const { messages, statusCode } = Constant
const { BadRequestError, NotFoundError } = errors
const {
  JWT: { expires },
} = Configuration

class UserController {
  getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await User.find({}).select(
        ' -uniqueIdentifier -__v -question -answer',
      )

      res.status(statusCode.OK).json({
        message: 'successful',
        data: {
          users,
        },
        status: true,
      })
    },
  )

  getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params

      const user = await User.findById(id).select(
        ' -uniqueIdentifier -__v -question -answer',
      )

      if (!user) {
        return next(new NotFoundError('User not found'))
      }

      res.status(statusCode.OK).json({
        message: 'User retrieved successfully',
        data: {
          user,
        },
        status: true,
      })
    },
  )
}

export default new UserController()
