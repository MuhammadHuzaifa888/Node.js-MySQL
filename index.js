const express= require('express');
const mysql= require('mysql');

// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
})

// Connect to MySQL
db.connect(err => {
    if (err) {
        throw err
    }
        console.log("MySQL Connected");
})

const app= express();

// Create MySQL Database
app.get('/createdb', (req, res) => {
    let sql = "CREATE Database nodemysql";
    db.query(sql, (err) => {
        if (err){
            throw err
        }
        res.send("Database Created");
    });
});

// Create Table
app.get('/createemployee', (req, res) => {
    let sql = "CREATE TABLE Employee (id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), Primary KEY(id))";
    db.query(sql, (err) => {
        if (err){
            throw err
        }
        res.send('Employee Table Created')
    })
})

// Insert Employee
app.get('/employee',(req,res) => {
    let post = {name: 'Muhammad Huzaifa', designation: 'AWS Cloud Engineer'}
    let sql = 'INSERT INTO Employee SET ?'
    let query = db.query(sql, post, (err) => {
        if (err){
            throw err
        }
        res.send('Employee added');
    });
}); 

// Select Employee
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM Employee'
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        console.log(results)
        res.send('Employee details fetched')
    });
});

// Update Employee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'Paetrick Bateman'
    let sql = `UPDATE Employee SET name = ? WHERE id = ?`;
    let query = db.query(sql, [newName, req.params.id], (err) => {
        if (err) {
            throw err
        }
        res.send("Employee Updated");
    });
}); 

// Delete Employee
app.delete('/deleteemployee/:id', (req, res) => {
    let sql = 'DELETE FROM Employee WHERE id = ?';
    let query = db.query(sql, [req.params.id], (err,result) => {
        if (err){
            throw err
        }
        console.log(result)
        res.send('Employee deleted')
    })
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
});