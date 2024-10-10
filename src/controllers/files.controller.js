const { getFormattedFiles, getFilesFromRemoteApi } = require('../services/files.service')

const getFiles = async (req, res, next) => {
  try {
    const { fileName } = req.query

    const files = await getFormattedFiles(fileName)

    return res.json({ files })
  } catch (error) {
    return next(error)
  }
}

const getFilesRaw = async (_req, res, next) => {
  try {
    const files = await getFilesFromRemoteApi()

    return res.json({ files })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getFiles,
  getFilesRaw
}
