/**
 * This server lets you see a list of templates you have fetched and serves them as static asset
 * with live reload 🔥
 */

const express = require('express')
const fs = require('fs')
const path = require('path')
const livereload = require('livereload')

const { generateView } = require('./utils/generateHtmlView')
const app = express()
const PORT = process.env.PORT || 4001
const liveServer = livereload.createServer()

app.use(express.static('./src/public'))
app.get('/', (_req, res) => {
  const fetchedPath = path.join(__dirname + '/data/fetched.json')
  console.log(fetchedPath)
  const document = fs.readFileSync(fetchedPath, { encoding: 'utf-8' })
  const parsed = JSON.parse(document)
  const list = (Array.isArray(parsed) ? parsed : []).map(e => e.type)
  const view = generateView(list)
  res.set('Content-Type', 'text/html')
  return res.status(200).send(view)
})
app.listen(PORT, async () => {
  console.log(`visit http://localhost:${PORT}`)
  liveServer.watch('./src/public')
})