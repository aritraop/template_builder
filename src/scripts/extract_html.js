
/**
 * The following script reads the fetched documents and creates a html file for each document with
 * the name of that document.type.html in the public folder from there you can update the templates
 * and view them also
 */

const fs = require('fs')
const path = require('path')

//read the fetched file
const fetchedPath = path.join(__dirname + '/..' + '/data/fetched.json')
console.log(fetchedPath)
const data = fs.readFileSync(fetchedPath, { encoding: 'utf-8' })
console.log('fetched file read successfully')

const parsed = JSON.parse(data)

//for each document extract the html body insert into public folder...
for (const elem of parsed) {
  const publicPath = path.join(__dirname + '/..' + `/public/${elem.type}.html`)
  // console.log(publicPath)

  fs.writeFileSync(publicPath, elem.html_body.concat('<script src="//localhost:35729/livereload.js"></script>'))
  console.log(`created ${elem.type}.html`)
}