function createOrganizationTable(db){
    db.run(`
        CREATE TABLE IF NOT EXISTS OrganizationConfig (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        organization TEXT,
        title TEXT,
        favourite_brand TEXT,
        main_button_text TEXT,
        help_url TEXT,
        help_text TEXT
        )
    `, (err) => {
        if (err) {
        console.error('Error creating table:', err.message);
        } else {
        console.log('OrganizationConfig table is ready.');
        }
        }
    );
}

function createCountryTable(db){
    db.run(`
        CREATE TABLE IF NOT EXISTS CountryConfig (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          country TEXT,
          title TEXT,
          favourite_brand TEXT,
          main_button_text TEXT,
          help_url TEXT,
          help_text TEXT,
          organization_configuration_id INTEGER,
          FOREIGN KEY (organization_configuration_id) REFERENCES OrganizationConfig(id) ON DELETE CASCADE
        );
      `, (err) => {
        if (err) {
          console.error('Error creating CountryConfig table:', err.message);
        } else {
          console.log('CountryConfig table is ready with foreign key.');
        }
        }
    );
}

function createLocationTable(db){
    db.run(`
        CREATE TABLE IF NOT EXISTS LocationConfig (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          location TEXT,
          title TEXT,
          favourite_brand TEXT,
          main_button_text TEXT,
          help_url TEXT,
          help_text TEXT,
          country_configuration_id INTEGER,
          FOREIGN KEY (country_configuration_id) REFERENCES CountryConfig(id) ON DELETE CASCADE
        );
      `, (err) => {
        if (err) {
          console.error('Error creating LocationConfig table:', err.message);
        } else {
          console.log('LocationConfig table is ready with foreign key.');
        }
      }
    );
}

function setUpDatabase(db){
    db.serialize(() => {
        createOrganizationTable(db)
        createCountryTable(db)
        createLocationTable(db)
      }
    );      
}

module.exports = { setUpDatabase }