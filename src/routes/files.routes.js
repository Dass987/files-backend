const { Router } = require('express')

const router = Router()

/* Controllers */
const { getFiles } = require('../controllers/files.controller')

router.get('/data', getFiles)

module.exports = router
