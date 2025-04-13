const express = require('express')
const cors = require('cors')
const app = express()
const port = 5174

app.use(cors())

app.get('/api/get-organization-config', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/get-country-config', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/get-location-config', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})