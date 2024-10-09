const os = require('os');
const axios = require('../utils/axios');

const getFormattedFiles = async () => {
  try {
    const response = await axios.get('/secret/files');
    const { files } = response.data;

    // await getFileByNameFromRemoteAPI('test3.csv');

    // return [];

    return await Promise.all(files.map(file => getFileByNameFromRemoteAPI(file)));
  } catch (error) {
    return [];
  }
};

const getFileByNameFromRemoteAPI = async fileName => {
  if (!fileName) return null;

  const result = {
    file: fileName,
    lines: [],
  };

  try {
    const response = await axios.get(`/secret/file/${fileName}`);

    return formatContent(response.data, fileName);
  } catch (error) {
    // result.lines = error.response.data;
    return result;
  }
};

const formatFileContent = (fileContent = '') => {
  if (!fileContent) return '';
  const newFileContent = '';

  return newFileContent;
};

function formatContent(fileContent, fileName) {
  if (!fileName) return '';

  const result = {
    file: fileName,
    lines: [],
  };

  const lines = fileContent.split('\n');

  const header = lines[0].split(',');
  const columns = header.slice(1); // Omitimos la primera columna (filename)

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');

    const data = {};

    for (let j = 0; j < columns.length; j++) {
      data[columns[j]] = line[j + 1]; // Omitimos la primera columna (filename)
    }

    if (data.text && data.number && data.hex) result.lines.push(data);
  }

  return result;
}

module.exports = { getFormattedFiles, formatFileContent, getFileByNameFromRemoteAPI };
