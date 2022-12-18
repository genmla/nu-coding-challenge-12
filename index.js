// const Game = require("./lib/Game");

// Initialize a new Game object
// const game = new Game();

// Start playing
// game.play();

const express = require('express');
const sequelize = require('./config/connection');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table')

// const app = express();
// const PORT = process.env.PORT || 3001;

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Force true to drop/recreate table(s) on every sync
// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // TODO: Add MySQL password here
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the movies_db database.`)
);

const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
//     }
// );
// Add an employee
// app.post('/api/new-movie', ({ body }, res) => {
//     const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//     const params = [body.movie_name];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body
//         });
//     });
// });

// See all employees
// app.get('/api/movies', (req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// See all departments
function prompting() {
    inquirer
        .prompt([
            {
                type: 'checkbox',
                message: 'What would you like to do?',
                name: 'action',
                choices:
                    ['View All Employees',
                        'Add Employee',
                        'Update Employee Role',
                        'View All Roles',
                        'Add Role',
                        'View All Departments',
                        'Add Department',
                        'Exit App']
            },
        ])
        .then((response) => {
            if (response.action == 'View All Departments') {
                const sql = `SELECT id, name AS Department FROM departments`;

                db.query(sql, (err, results) => {
                    console.table(results);
                });
            }
            if (response.action == 'View All Roles') {
                const sql = `SELECT id, title AS Role, salary AS Salary, department_id as Department FROM roles`;
                db.query(sql, (err, results) => {
                    console.table(results);
                });
            }
            if (response.action == 'View All Employees') {
                const sql = `SELECT * FROM employees`;
                db.query(sql, (err, results) => {
                    console.table(results);
                });
            }
            if (response.action == 'Exit App') {
                console.log("Press Ctrl c")
            }
        })
    // .then((response) => {
    //     return prompting()
    // })
}

prompting()

// app.get('/api/movies', (req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// See all roles
// app.get('/api/movies', (req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//     const sql = `DELETE FROM movies WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.statusMessage(400).json({ error: res.message });
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Movie not found'
//             });
//         } else {
//             res.json({
//                 message: 'deleted',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });

// Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//     const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//     const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//     const params = [req.body.review, req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Movie not found'
//             });
//         } else {
//             res.json({
//                 message: 'success',
//                 data: req.body,
//                 changes: result.affectedRows
//             });
//         }
//     });
// });

// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
