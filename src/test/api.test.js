/* global describe, it */

const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')

const expect = chai.expect
chai.use(chaiHTTP)

describe('GET /api/files/data', () => {
  it('should return an array of files', () => {
    return chai
      .request(app)
      .get('/api/files/data')
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('files')
        expect(res.body.files).to.be.an('array')
      })
  })

  it('each file should have a "file" property of type string', () => {
    return chai
      .request(app)
      .get('/api/files/data')
      .then(res => {
        res.body.files.forEach(file => {
          expect(file).to.have.property('file').that.is.a('string')
          expect(file).to.have.property('lines').that.is.a('array')
        })
      })
  })

  it('each file should have a "lines" property of type array', () => {
    return chai
      .request(app)
      .get('/api/files/data')
      .then(res => {
        res.body.files.forEach(file => {
          expect(file).to.have.property('lines').that.is.an('array')
        })
      })
  })

  it('each line should have "text", "number", and "hex" properties', () => {
    return chai
      .request(app)
      .get('/api/files/data')
      .then(res => {
        res.body.files.forEach(file => {
          file.lines.forEach(line => {
            expect(line).to.have.property('text').that.is.a('string')
            expect(line).to.have.property('number').that.is.a('number')
            expect(line).to.have.property('hex').that.is.a('string')
          })
        })
      })
  })

  // Prueba para verificar que al menos un archivo tenga líneas
  it('at least one file should have lines', () => {
    return chai
      .request(app)
      .get('/api/files/data')
      .then(res => {
        expect(res.body.files.some(file => file.lines.length > 0)).to.be.true
      })
  })
})
