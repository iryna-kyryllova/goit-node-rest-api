import bcrypt from 'bcrypt'
import gravatar from 'gravatar'
import { nanoid } from 'nanoid'
import User from '../db/models/User.js'
import HttpError from '../helpers/HttpError.js'
import { generateToken } from '../helpers/jwt.js'
import sendEmail from '../helpers/sendEmail.js'

const createVerifyEmail = (email, verificationToken) => ({
  to: email,
  subject: 'Verify your email',
  html: `<a href="${process.env.APP_DOMAIN}/api/auth/verify/${verificationToken}" target="_blank">Click to verify email</a>`
})

const findUser = (query) => User.findOne({ where: query })

const register = async (data) => {
  const { email, password } = data

  const user = await User.findOne({ where: { email } })

  if (user) {
    throw HttpError(409, 'Email in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const avatar = gravatar.url(email)

  const verificationToken = nanoid()

  const newUser = User.create({
    ...data,
    password: hashedPassword,
    avatarURL: avatar,
    verificationToken
  })

  const verificationEmail = createVerifyEmail(email, verificationToken)

  await sendEmail(verificationEmail)
  return newUser
}

const verifyEmail = async (verificationToken) => {
  const user = await findUser({ verificationToken })

  if (!user) {
    throw HttpError(404, 'User not found')
  }

  await user.update({ verificationToken: null, verify: true })
}

const resendVerifyEmail = async (email) => {
  const user = await findUser({ email })

  if (!user) {
    throw HttpError(404, 'User not found')
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed')
  }

  const verificationEmail = createVerifyEmail(email, user.verificationToken)

  await sendEmail(verificationEmail)
}

const login = async (data) => {
  const { email, password } = data

  const user = await User.findOne({ where: { email } })

  if (!user) {
    throw HttpError(401, 'Email or password is wrong')
  }

  if (!user.verify) {
    throw HttpError(401, 'Email is not verified')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw HttpError(401, 'Email or password is wrong')
  }

  const payload = { id: user.id }

  const token = generateToken(payload)

  await user.update({ token })

  return { token, user }
}

const logout = async (id) => {
  const user = await findUser({ id })

  if (!user || !user.token) {
    throw HttpError(401, 'Not authorized')
  }

  await user.update({ token: null })
}

const updateAvatar = async (id, avatar) => {
  const user = await findUser({ id })

  if (!user) {
    throw HttpError(401, 'Not authorized')
  }

  await user.update({ avatarURL: avatar })

  return { avatarURL: avatar }
}

export default { findUser, register, login, logout, updateAvatar, verifyEmail, resendVerifyEmail }
