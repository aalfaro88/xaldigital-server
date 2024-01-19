// Import the sqlite3 library
const sqlite3 = require('sqlite3').verbose();

// Create a new database or open an existing one (e.g., 'flightData.db')
const db = new sqlite3.Database('flightData.db');

// Define the SQL statements to create tables
const createAirlinesTable = `
  CREATE TABLE IF NOT EXISTS airlines (
    id_aerolinea INTEGER PRIMARY KEY,
    nombre_aerolinea TEXT
  );`;

const createAirportsTable = `
  CREATE TABLE IF NOT EXISTS airports (
    id_aeropuerto INTEGER PRIMARY KEY,
    nombre_aeropuerto TEXT
  );`;

const createMovementsTable = `
  CREATE TABLE IF NOT EXISTS movements (
    id_movimiento INTEGER PRIMARY KEY,
    descripcion TEXT
  );`;

const createFlightsTable = `
  CREATE TABLE IF NOT EXISTS flights (
    id_aerolinea INTEGER,
    id_aeropuerto INTEGER,
    id_movimiento INTEGER,
    dia TEXT,
    FOREIGN KEY (id_aerolinea) REFERENCES airlines (id_aerolinea),
    FOREIGN KEY (id_aeropuerto) REFERENCES airports (id_aeropuerto),
    FOREIGN KEY (id_movimiento) REFERENCES movements (id_movimiento)
  );`;

// Execute the SQL statements to create tables
db.serialize(() => {
  db.run(createAirlinesTable);
  db.run(createAirportsTable);
  db.run(createMovementsTable);
  db.run(createFlightsTable);

  // Insert data into tables (you can adapt this part with your own data)
  const insertAirlinesData = `
    INSERT INTO airlines (id_aerolinea, nombre_aerolinea)
    VALUES
      (1, 'Volaris'),
      (2, 'Aeromar'),
      (3, 'Interjet'),
      (4, 'Aeromexico');`;

  const insertAirportsData = `
    INSERT INTO airports (id_aeropuerto, nombre_aeropuerto)
    VALUES
      (1, 'Benito Juarez'),
      (2, 'Guanajuato'),
      (3, 'La Paz'),
      (4, 'Oaxaca');`;

  const insertMovementsData = `
    INSERT INTO movements (id_movimiento, descripcion)
    VALUES
      (1, 'Salida'),
      (2, 'Llegada');`;

  const insertFlightsData = `
    INSERT INTO flights (id_aerolinea, id_aeropuerto, id_movimiento, dia)
    VALUES
      (1, 1, 1, '2021-05-02'),
      (2, 1, 1, '2021-05-02'),
      (3, 2, 2, '2021-05-02'),
      (4, 3, 2, '2021-05-02'),
      (1, 3, 2, '2021-05-02'),
      (2, 1, 1, '2021-05-02'),
      (2, 3, 1, '2021-05-04'),
      (3, 4, 1, '2021-05-04'),
      (3, 4, 1, '2021-05-04');`;

  // Execute the SQL statements to insert data
  db.run(insertAirlinesData);
  db.run(insertAirportsData);
  db.run(insertMovementsData);
  db.run(insertFlightsData);
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database connection closed.');
});
