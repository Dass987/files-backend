const { Router } = require('express')

const router = Router()

/* Controllers */
const { getFiles, getFilesRaw } = require('../controllers/files.controller')

router.get('/data', getFiles)
router.get('/list', getFilesRaw)

module.exports = router
