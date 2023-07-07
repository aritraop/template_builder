/**
 * The following script reads the fetched data, and loops over the each document and reads the current
 * state of the html_body from the public folder and writes it in the document
 */


const fs = require('fs')
const path = require('path')

const fetchedPath = path.join(__dirname + '/..' + '/data/fetched.json')
const fetchedData = fs.readFileSync(fetchedPath, { encoding: 'utf-8' })
console.log('file read successfully')
const parsed = JSON.parse(fetchedData)

//map new html to the old one...
for (const elem of parsed) {
  const publicPath = path.join(__dirname + '/..' + `/public/${elem.type}.html`)
  const template = fs.readFileSync(publicPath, { encoding: 'utf8' })
  //update the body
  elem.html_body = template.replace('<script src="//localhost:35729/livereload.js"></script>', '')
  console.log('modified...' + elem.type + ' template')
}

const output = path.join(__dirname + '/..' + '/data/final.json')
fs.writeFileSync(output, JSON.stringify(parsed))
console.log('output done....')
process.exit(0)