const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFilePath = "./database.db";
const dbExists = fs.existsSync(dbFilePath);

const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    if (!dbExists) {
      console.log('Database file created.');
    } else {
      console.log('Database file already exists!');
    }
  }
});



const app = express()
const port = 5174

app.use(cors())

app.get('/api/get-organization-config', (req, res) => {
  res.send(
    {
      "name": "Organization 1",
      "title": "Welcome",
      "favorite_brand": "NIKE",
      "main_button_text": "GET STARTED",
      "help_url": "https://www.youtube.com/",
      "help_text": "Need help? Visit our website",
    },
  )
})

app.get('/api/get-country-config', (req, res) => {
  res.send({
    "name": "Organization 1",
    "country": "Germany",
    "title": "Bonjour",
    "favorite_brand": "NIKE",
    "main_button_text": "GET STARTED",
    "help_url": "https://www.youtube.com/",
    "help_text": "Need help? Visit our website",
  })
})

app.get('/api/get-location-config', (req, res) => {
  res.send({
    "name": "Organization 1",
    "country": "Germany",
    "location": "Frankfurt",
    "title": "Hallo",
    "favorite_brand": "NIKE",
    "main_button_text": "GET STARTED",
    "help_url": "https://www.youtube.com/",
    "help_text": "Need help? Visit our website",
  })
})

app.get('/api/get-organizations', (req, res) => {
  res.send([
    {
      "name": "Organization 1",
      "title": "Welcome",
      "favorite_brand": "NIKE",
      "main_button_text": "GET STARTED",
      "help_url": "https://www.youtube.com/",
      "help_text": "Need help? Visit our website",
    },
    {
      "name": "Organization 2",
      "title": "Hello!",
      "favorite_brand": "ADIDAS",
      "main_button_text": "GET STARTED",
      "help_url": "https://www.google.com/",
      "help_text": "Need help? Visit our website",
    }
  ])
})

app.get('/api/get-organization-country-configs', (req, res) => {
  res.send([
    {
      "name": "Organization 1",
      "country": "France",
      "title": "Bonjour",
      "favorite_brand": "NIKE",
      "main_button_text": "GET STARTED",
      "help_url": "https://www.youtube.com/",
      "help_text": "Need help? Visit our website",
    },
    {
      "name": "Organization 1",
      "country": "Germany",
      "title": "Bonjour",
      "favorite_brand": "NIKE",
      "main_button_text": "GET STARTED",
      "help_url": "https://www.youtube.com/",
      "help_text": "Need help? Visit our website",
    },
  ])
})

app.get('/api/get-organization-location-configs', (req, res) => {
  res.send([
    {
      "name": "Organization 1",
      "country": "Germany",
      "location": "Frankfurt",
      "title": "Hallo",
      "favorite_brand": "NIKE",
      "main_button_text": "GET STARTED",
      "help_url": "https://www.youtube.com/",
      "help_text": "Need help? Visit our website",
    },
    {
      "name": "Organization 1",
      "country": "Germany",
      "location": "Berlin",
      "title": "Hello",
      "favorite_brand": "NIKE",
      "main_button_text": "GET STARTED",
      "help_url": "https://www.youtube.com/",
      "help_text": "Need help? Visit our website",
    },
  ])
})

//TODO UPDATE OR CREATE
app.post("/api/update-organization-config", (req, res) => {})
app.post("/api/update-country-config", (req, res) => {})
app.post("/api/update-location-config", (req, res) => {})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})