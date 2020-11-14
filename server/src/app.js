const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'newuser',
  password : 'password',
  database : 'monify'
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        message: 'hello world!',
    })
})
app.get('/getFiveData', (req, res) => {
    connection.query('SELECT * FROM data LIMIT 0,5', function (error, results) {
        if (error) throw error

        // connected!
        res.send({
            result: results,
        })
    });
})
app.get('/getAllSalary', (req, res) => {
    connection.query('SELECT YEAR(tanggal) AS year, MONTH(tanggal) AS month, SUM(amount) as amount FROM data WHERE category = "salary" GROUP BY YEAR(tanggal), MONTH(tanggal) ORDER BY year, month', function (error, results) {
        if (error) throw error

        // connected!
        res.send({
            result: results,
        })
    });
})
app.get('/getAllSpending', (req, res) => {
    connection.query('SELECT YEAR(tanggal) AS year, (SUM(amount)*-1) as amount, category FROM data WHERE category <> "salary" AND category <> "deposits" AND category <> "savings" GROUP BY category, YEAR(tanggal) ORDER BY category, year', function (error, results) {
        if (error) throw error

        // connected!
        res.send({
            result: results,
        })
    });
})
app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email} bla bla!`
    })
})

app.listen(process.env.PORT || 8081)
