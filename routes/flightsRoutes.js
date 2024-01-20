const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const https = require('https');
const fs = require('fs');


const githubRawUrl = process.env.GITHUB_LINK;

const localFilePath = './api/flightData.db';


const file = fs.createWriteStream(localFilePath);
https.get(githubRawUrl, (response) => {
  response.pipe(file);
});


const db = new sqlite3.Database(localFilePath);



router.get('/fetch-flights', (req, res) => {
    const query = `
      SELECT f.id_aerolinea, a.nombre_aerolinea, f.id_aeropuerto, ap.nombre_aeropuerto, f.id_movimiento, m.descripcion, f.dia
      FROM flights f
      INNER JOIN airlines a ON f.id_aerolinea = a.id_aerolinea
      INNER JOIN airports ap ON f.id_aeropuerto = ap.id_aeropuerto
      INNER JOIN movements m ON f.id_movimiento = m.id_movimiento
    `;
  
    db.all(query, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching flights data' });
      }
      res.status(200).json({ flights: rows });
    });
  });
  


// QUERYS!

router.get('/airport-with-most-movements', (req, res) => {
    const query = `
      SELECT airports.nombre_aeropuerto, COUNT(*) AS total_movements
      FROM flights
      INNER JOIN airports ON flights.id_aeropuerto = airports.id_aeropuerto
      GROUP BY flights.id_aeropuerto
      ORDER BY total_movements DESC
      LIMIT 1;
    `;
  
    db.get(query, [], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching airport with most movements' });
      }
      res.status(200).json({ airportWithMostMovements: row });
    });
  });

  router.get('/airline-with-most-flights', (req, res) => {
    const query = `
      SELECT airlines.nombre_aerolinea, COUNT(*) AS total_flights
      FROM flights
      INNER JOIN airlines ON flights.id_aerolinea = airlines.id_aerolinea
      GROUP BY flights.id_aerolinea
      ORDER BY total_flights DESC
      LIMIT 1;
    `;
  
    db.get(query, [], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching airline with most flights' });
      }
      res.status(200).json({ airlineWithMostFlights: row });
    });
  });
  
  router.get('/day-with-most-flights', (req, res) => {
    const query = `
      SELECT dia, COUNT(*) AS total_flights
      FROM flights
      GROUP BY dia
      ORDER BY total_flights DESC
      LIMIT 1;
    `;
  
    db.get(query, [], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching day with most flights' });
      }
      res.status(200).json({ dayWithMostFlights: row });
    });
  });

  router.get('/airlines-with-more-than-2-flights-per-day', (req, res) => {
    const query = `
      SELECT airlines.nombre_aerolinea, flights.dia, COUNT(*) AS total_flights
      FROM flights
      INNER JOIN airlines ON flights.id_aerolinea = airlines.id_aerolinea
      GROUP BY flights.id_aerolinea, flights.dia
      HAVING total_flights > 2;
    `;
  
    db.all(query, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching airlines with more than 2 flights per day' });
      }
      res.status(200).json({ airlinesWithMoreThan2FlightsPerDay: rows });
    });
  });
  
  
  

  




module.exports = router;
