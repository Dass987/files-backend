const os = require('os')
const chalk = require('chalk')

// ** Server config
const http = require('http')
const app = require('./src/app')

// ** Utils
const { name, version } = require('./package.json')
const logger = require('./src/utils/logger')

const PORT = 3000

const server = http.createServer(app)

logger.neutral(`${os.EOL}`)
logger.info('----------- [APP-INFO] -----------')
console.log(chalk.green('[NAME]: ') + name)
console.log(chalk.green('[VERSION]: ') + version)

logger.neutral(`${os.EOL}`)
logger.info('-------- [EXPRESS-SERVER] --------')
logger.processing('[EXPRESS-SERVER]: Initializing...')

server.listen(PORT, () => {
  try {
    logger.success('[EXPRESS-SERVER]: Server started! ✔')
    console.log(chalk.green('[ENVIRONMENT]: development'))
    console.log(`${chalk.green('[PORT]:')} ${PORT} ${chalk.green('✔')}`)
  } catch (error) {
    /* Error al conectar con el servidor Express */
    logger.error('[EXPRESS-SERVER]: Error ❌')
    logger.error('Ha ocurrido un error al intentar iniciar los servicios.')
    logger.neutral(`${os.EOL}`)
    console.log(chalk.red('[ERROR] ->'), error)
    logger.neutral(`${os.EOL}${os.EOL}`)
  }
})

process.on('SIGTERM', async () => {
  process.exit(0)
})
