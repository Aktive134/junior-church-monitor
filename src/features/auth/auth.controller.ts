import { Request, Response, NextFunction } from 'express'
import User from '../user/user.model'
import Constant from '../../constant'
import errors from '../../common/error-handler'
import generateToken from '../../lib/generate-token'
import { redisClient } from '../../redis.config'
import { v4 } from 'uuid'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import sendEmail from '../../providers/email-service'
import mailTemplate from '../../template'
import Configuration from '../../config'
// import { verifyOtp, sendOtp } from '../../lib/utils'

const { messages, statusCode } = Constant
const { BadRequestError, ApplicationError } = errors
const { verification_link, login_link } = Configuration
const { sendInvite, loginInvite } = mailTemplate
const EXPIRATION_TIME_SIGNUP = 48 * 60 * 60
const EXPIRATION_TIME_LOGIN = 60 * 10

class AuthController {
  sendInvite = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { first_name, email } = req.body

      const tempUserkey = `onboarding:user:${email}`

      const [isUser, isTempUser] = await Promise.all([
        User.findOne({ email }),
        redisClient.get(tempUserkey),
      ])

      if (isUser || isTempUser) {
        return next(new BadRequestError(messages.userExist))
      }

      const reference = v4()
      await redisClient.setEx(
        reference,
        EXPIRATION_TIME_SIGNUP,
        JSON.stringify(req.body),
      )
      await redisClient.setEx(tempUserkey, EXPIRATION_TIME_SIGNUP, '1')

      const url = `${verification_link}?reference=${reference}`
      //send email to user
      const emailData = {
        to: email,
        subject: messages.adminInviteMsg,
        html: sendInvite(first_name, url),
      }

      await sendEmail(emailData)

      res.status(statusCode.OK).json({
        message: messages.emailSent,
        data: {
          url,
        },
        status: true,
      })
    },
  )

  signUpHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const reference = req.query.reference as string
      const { security_question, security_answer } = req.body

      if (!reference) {
        return next(new BadRequestError('Invalid Reference'))
      }

      const isRefAvailable = (await redisClient.get(reference)) as string
      if (!isRefAvailable) {
        return next(new BadRequestError('Link has expired'))
      }

      const userData = JSON.parse(isRefAvailable)
      const tempUserkey = `onboarding:user:${userData.email}`
      if (!userData.email) {
        return next(new BadRequestError('Invalid user data'))
      }

      const user = new User({
        ...userData,
        question: security_question,
        answer: security_answer,
      })

      await user.save()

      const { _id, isActive, isAdmin, email } = user
      const tokenData: Record<string, any> = {
        _id,
        email,
        isActive,
        isAdmin,
      }

      const token = generateToken(tokenData) as string

      // Delete temporary data from Redis
      const deletedKeys = await redisClient.del([tempUserkey, reference])
      if (!deletedKeys) {
        return next(
          new ApplicationError('Failed to delete temporary keys from Redis'),
        )
      }

      res.status(statusCode.OK).json({
        message: messages.userCreated,
        data: {
          token,
        },
        status: true,
      })
    },
  )

  loginInvite = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body
      const tempUserkey = `onboarding:user:${email}`

      const [user, isTempUser] = await Promise.all([
        User.findOne({ email }),
        redisClient.get(tempUserkey),
      ])

      if (isTempUser) {
        return next(new BadRequestError('Login link still valid'))
      }

      if (!user) {
        return next(
          new BadRequestError('User is not registered, contact admin'),
        )
      }

      const reference = v4()
      await redisClient.setEx(
        reference,
        EXPIRATION_TIME_LOGIN,
        JSON.stringify(req.body),
      )
      await redisClient.setEx(tempUserkey, EXPIRATION_TIME_LOGIN, '1')

      const url = `${login_link}?reference=${reference}`

      const emailData = {
        to: email,
        subject: 'OTP LOGIN',
        html: loginInvite(user.first_name, url),
      }

      await sendEmail(emailData)

      res.status(statusCode.OK).json({
        message: messages.emailSent,
        data: {
          url,
          securityQuestion: user.question,
        },
        status: true,
      })
    },
  )

  loginHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { answer } = req.body
      const reference = req.query.reference as string

      if (!reference) {
        return next(new BadRequestError('Invalid Reference'))
      }

      const isRefAvailable = (await redisClient.get(reference)) as string
      if (!isRefAvailable) {
        return next(new BadRequestError('Link has expired'))
      }

      const userData = JSON.parse(isRefAvailable)
      const user = await User.findOne({ email: userData.email })
      const tempUserkey = `onboarding:user:${userData.email}`

      if (!user) {
        return next(new BadRequestError('Invalid user data'))
      }

      if (user.answer !== answer) {
        return next(new BadRequestError('Provide a valid answer'))
      }

      const { _id, isActive, isAdmin, email } = user
      const tokenData: Record<string, any> = {
        _id,
        email,
        isActive,
        isAdmin,
      }
      const token = generateToken(tokenData) as string;

      const deletedKeys = await redisClient.del([tempUserkey, reference])
      if (!deletedKeys) {
        return next(
          new ApplicationError('Failed to delete temporary keys from Redis'),
        )
      }

      res.status(statusCode.OK).json({
        message: 'Login successful',
        data: {
          token,
        },
        status: true,
      })
    },
  )

  // sendOtp = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const { phoneNumber } = req.body

  //     if (!phoneNumber) {
  //       return next(new BadRequestError('Phone number is required'))
  //     }
  //     const sessionToken = await sendOtp(phoneNumber)

  //     res.status(statusCode.OK).json({
  //       message: 'OTP sent successfully',
  //       sessionToken, // Session token returned to client
  //       status: true,
  //     })
  //   },
  // )

  // verifyOtp = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const { otp, phoneNumber } = req.body
  //     await verifyOtp(otp, phoneNumber)

  //     res.status(statusCode.OK).json({
  //       message: 'OTP verified successfully',
  //       status: true,
  //     })
  //   },
  // )
}

export default new AuthController()
