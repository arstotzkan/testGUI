const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const {setUpDatabase} = require("./setUpDatabase.js");

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

setUpDatabase(db)

const app = express()
const port = 5174

app.use(cors())
app.use(express.json())

app.get('/api/get-organization-config', (req, res) => {
  let query = `SELECT * FROM OrganizationConfig WHERE id = ?`;
  db.all(query, [req.query.id], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(rows);
  });
})

app.get('/api/get-country-config', (req, res) => {
  let query = `SELECT * FROM CountryConfig WHERE id = ?`;
  db.all(query, [req.query.id], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(rows);
  });
})

app.get('/api/get-location-config', (req, res) => {
  let query = `SELECT * FROM LocationConfig WHERE id = ?`;

  db.all(query, [req.query.id], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(rows);
  });
})

app.get('/api/get-organizations', (req, res) => {
  let query = `SELECT * FROM OrganizationConfig`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(rows);
  });
})

app.get('/api/get-organization-country-configs', (req, res) => {
  let query = `SELECT * FROM CountryConfig WHERE organization_configuration_id = ?`;
  db.all(query, [req.query.id], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(rows);
  });
})

app.get('/api/get-organization-location-configs', (req, res) => {
  let query = `SELECT * FROM LocationConfig WHERE country_configuration_id = ?`;

  db.all(query, [req.query.id], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(rows);
  });
})

//TODO UPDATE OR CREATE
app.post("/api/update-organization-config", (req, res) => {

  const { title, favourite_brand, main_button_text, help_url, help_text, id } = req.body;

  let query = `
    UPDATE OrganizationConfig
    SET title = ?, favourite_brand = ?, main_button_text = ?, help_url = ?, help_text = ?
    WHERE id = ?
  `;

  db.run(query, [title, favourite_brand, main_button_text, help_url, help_text, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Organization updated', changes: this.changes });
  });

})

app.post("/api/update-country-config", (req, res) => {

  const { title, favourite_brand, main_button_text, help_url, help_text, id } = req.body;

  let query = `
    UPDATE CountryConfig
    SET title = ?, favourite_brand = ?, main_button_text = ?, help_url = ?, help_text = ?
    WHERE id = ?
  `;

  db.run(query, [title, favourite_brand, main_button_text, help_url, help_text, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Country updated', changes: this.changes });
  });

})

app.post("/api/update-location-config", (req, res) => {

  const { title, favourite_brand, main_button_text, help_url, help_text, id } = req.body;
  
  let query = `
    UPDATE LocationConfig
    SET title = ?, favourite_brand = ?, main_button_text = ?, help_url = ?, help_text = ?
    WHERE id = ?
  `;

  db.run(query, [title, favourite_brand, main_button_text, help_url, help_text, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Location updated', changes: this.changes });
  });
})


app.post("/api/create-organization-config", (req, res) => {
  const { organization, title, favourite_brand, main_button_text, help_url, help_text } = req.body;

  let query = `
    INSERT INTO OrganizationConfig (organization, title, favourite_brand, main_button_text, help_url, help_text)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [organization, title, favourite_brand, main_button_text, help_url, help_text], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Organization inserted', id: this.lastID });
  });
})

app.post("/api/create-country-config", (req, res) => {

  const { country, title, favourite_brand, main_button_text, help_url, help_text, organization_configuration_id } = req.body;

  let query = `
    INSERT INTO CountryConfig (country, title, favourite_brand, main_button_text, help_url, help_text, organization_configuration_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [country, title, favourite_brand, main_button_text, help_url, help_text, organization_configuration_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Country inserted', id: this.lastID });
  });
})

app.post("/api/create-location-config", (req, res) => {

  const { location, title, favourite_brand, main_button_text, help_url, help_text, country_configuration_id } = req.body;

  let query = `
    INSERT INTO LocationConfig (location, title, favourite_brand, main_button_text, help_url, help_text, country_configuration_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [location, title, favourite_brand, main_button_text, help_url, help_text, country_configuration_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Location inserted', id: this.lastID });
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})