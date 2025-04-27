import multer from 'multer'
import path from 'path'
import HttpError from '../helpers/HttpError.js'

const tempDir = path.resolve('temp')

const storage = multer.diskStorage({
  destination: tempDir,
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniquePrefix + '_' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  const extension = file.originalname.split('.').pop()

  if (allowedExtensions.includes(extension)) {
    cb(null, true)
  } else {
    cb(HttpError(400, 'Invalid file type. Only JPG, JPEG, PNG, GIF, WEBP are allowed.'))
  }
}

const upload = multer({ storage, fileFilter })

export default upload
