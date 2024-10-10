const axios = require('../utils/axios')

const getFilesFromRemoteApi = async () => {
  const response = await axios.get('/secret/files')
  const { files } = response.data
  return files
}

const getFormattedFiles = async (fileName = '') => {
  try {
    const files = await getFilesFromRemoteApi()

    let result = await Promise.all(files.map(file => getFileByNameFromRemoteAPI(file)))

    if (fileName) result = result.filter(item => item.file === fileName)

    return result.filter(file => file.lines.length > 0)
  } catch (error) {
    return []
  }
}

const getFileByNameFromRemoteAPI = async fileName => {
  if (!fileName) return null

  const result = {
    file: fileName,
    lines: []
  }

  try {
    const response = await axios.get(`/secret/file/${fileName}`)

    return formatContent(response.data, fileName)
  } catch (error) {
    // result.lines = error.response.data;
    return result
  }
}

function formatContent (fileContent, fileName) {
  if (!fileName) return ''

  const result = {
    file: fileName,
    lines: []
  }

  const lines = fileContent.split('\n')

  const header = lines[0].split(',')
  const columns = header.slice(1) // Omitimos la primera columna (filename)

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',')

    const data = {}

    for (let j = 0; j < columns.length; j++) {
      data[columns[j]] = line[j + 1] // Omitimos la primera columna (filename)
    }

    data.number = Number(data.number)

    if (data.text && data.number && data.hex) result.lines.push(data)
  }

  return result
}

module.exports = { getFormattedFiles, getFileByNameFromRemoteAPI, getFilesFromRemoteApi }
