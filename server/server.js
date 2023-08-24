const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8081;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// MySQL database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'joseph',
  password: 'BALLIQ',
  database: 'balliq',
};

// Create a MySQL pool to manage connections
const pool = mysql.createPool(dbConfig);

// Endpoint to execute a Python script based on the content of the HTTP request
// app.post('/run-python-command', (req, res) => {
//   const pythonCommand = req.body.command;

//   exec(pythonCommand, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing the Python command: ${error.message}`);
//       return res.status(500).json({ error: 'An error occurred while running the Python command.' });
//     }

//     res.json({ output: stdout });
//   });
// });

// // Endpoint to insert data into the database
// app.post('/add-data', (req, res) => {
//   const data = req.body;

//   // Get a connection from the pool
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting database connection:', err);
//       return res.status(500).json({ error: 'An error occurred while connecting to the database.' });
//     }

//     // Insert data into the 'data' table
//     const query = 'INSERT INTO data (field1, field2) VALUES (?, ?)';
//     connection.query(query, [data.field1, data.field2], (err, result) => {
//       // Release the connection back to the pool
//       connection.release();

//       if (err) {
//         console.error('Error inserting data:', err);
//         return res.status(500).json({ error: 'An error occurred while inserting data into the database.' });
//       }

//       res.json({ message: 'Data added successfully.' });
//     });
//   });
// });

// Endpoint for searching for player from database
app.get('/get-teams', async (req, res) => {

  try {
    // If there is a search query, construct a SQL query with a WHERE clause to filter the data
    const query = `SELECT * FROM teams`

    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        return res.status(500).json({ error: 'An error occurred while connecting to the database.' });
      }

      // Query the database if there is a query
      if (query) {
        connection.query(query, (err, result) => {
          // Release the connection back to the pool
          connection.release();

          if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data from the database.' });
          }

          res.json(result);
        });
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the database.' });
  }
});

// Endpoint for searching for player from database
app.get('/search-players', async (req, res) => {
  const searchQuery = req.query.q; // Extract the search query from the request query parameters

  try {
    // If there is a search query, construct a SQL query with a WHERE clause to filter the data
    const query = searchQuery
      ? `SELECT player_id, full_name, num, pos, height, abrev, headshot, logo FROM players P INNER JOIN teams T ON P.team = T.team_id WHERE full_name LIKE '%${searchQuery}%' OR team_name LIKE '%${searchQuery}%' LIMIT 10`
      : '';

    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        return res.status(500).json({ error: 'An error occurred while connecting to the database.' });
      }

      // Query the database if there is a query
      if (query) {
        connection.query(query, (err, result) => {
          // Release the connection back to the pool
          connection.release();

          if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data from the database.' });
          }

          res.json(result);
        });
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the database.' });
  }
});

// Endpoint to execute a Python script based on the playerId received from the HTTP request
app.get('/player-stats/:playerId', (req, res) => {
  const { playerId } = req.params;

  // Construct the Python command based on the playerId
  const pythonCommand = `python python-scripts/fetch-player-data.py ${playerId}`;

  exec(pythonCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Python command: ${error.message}`);
      return res.status(500).json({ error: 'An error occurred while running the Python command.' });
    }

    // Assuming your Python script outputs data in JSON format
    let playerStatsData;
    try {
      playerStatsData = JSON.parse(stdout);
    } catch (parseError) {
      console.error('Error parsing the Python output:', parseError);
      return res.status(500).json({ error: 'An error occurred while parsing the Python output.' });
    }
    
    res.json(playerStatsData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
