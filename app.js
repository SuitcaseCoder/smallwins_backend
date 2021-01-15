// video that helped me: https://www.youtube.com/watch?v=kJA9rDX7azM&t=286s
//  article that helped me make post request: https://codeforgeek.com/handle-get-post-request-express-4/

// importing express --imported express.js using npm
const express = require("express");
// require mysql
var mysql = require("mysql");

var request = require("request");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
// same default port as react (3000), so change it to 5000
const port = 5000;

// ----------- MYSQL CODE START --------------
//  with major help from this video: https://www.youtube.com/watch?v=EN6Dx22cPRI&list=PL47Uf6xF4760GqrLtaKm4bEKNY7u7aZQw&index=5

// still left to do: actually host and create a database and then connect it to line 30 (replace 'sampleDB' with actual db)

// connect code to mysql database:
// const db = mysql.createConnection({
//   // properties ...
//   host: "localhost",
//   user: "root",
//   // change this eventually to a custom password
//   password: "",
//   // will change once we have a db
//   database: "sampleDB",
// });

// db.connect((err) => {
//   // if error
//   if (err) {
//     throw err;
//   } else {
//     console.log("Connected");
//   }
// });

// app.get('/', function(req,res){
//   // code about mysql here
//   // EX: (use sql query within paranthesis):
//  connection.query("SELECT * FROM DATABASE WHERE THIS = THAT", function(error, rows,fields)
// // if(!!error){
//    console.log('Error in query');
//    } else {
// console.log('successful query')
//    // parse with your rows/fields
// })
// })

//  -- CREATE A TABLE IN SQL
// app.get('/createwinstable', (req, res) => {
//   //  // the create table ... is all sql
//   let sql = 'CREATE TABLE wins(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id)';
//   db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('wins table created');
//   })
// })

// -- INSERT WIN 1
// app.get('/addwin1', (req,res) => {
// // whatever is being passed in as a new small win (from input)
//   let smallwin = {winMessage: 'win message one'};
//   let sql = 'INSERT INTO wins SET ?';
//   let query = db.query(sql, smallwin, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('small win 1 added');
//   })
// });

// -- SELECT SMALL WIINS
// app.get('/getsmallwins', (req,res) => {
//   let sql = 'SELECT * FROM smallwins';
//   let query = db.query(sql, (err, results) => {
//     if(err) throw err;
//     console.log(results);
//     res.send('small wins fetched');
//   })
// });

//  -- FETCH INDIVIDUAL WINS
// app.get('/getsmallwins/:id', (req,res) => {
//   let sql = `SELECT * FROM smallwins WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('small win fetched - just one');
//   })
// });

//  -- UPDATE WINS
// app.get('/updatesmallwin/:id', (req,res) => {
//   let newWinMsg = "new small win message to be updated to";
//   let sql = `UPDATE wins SET message = '${newWinMsg}' WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('small win updated - just one');
//   })
// });

// -- DELETE WIN
// app.get("/deletesmallwin/:id", (req, res) => {
//   let newWinMsg = "new small win message to be updated to";
//   let sql = `DELETE FROM wins WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("small win deleted - just one");
//   });
// });

// app.listen should go here if using mysql

// ----------- MYSQL CODE END --------------

//  ----------------- **BEFORE ADDING MYSQL CODE** ----------------
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// open up http://localhost:5000/ on web browser and you should see 'hello world'
// you can also test in postman

// I can create a brand new endpoint here
// and test it in Postman
app.get("/newEndpoint", (req, res) => {
  res.send("A whole new ... endpoint");
});

//  HERE'S WHAT I WOULD NEED FOR SMALL WINS
app.get("/smallwins", (req, res) => {
  request(
    "https://jsonplaceholder.typicode.com/comments?postId=1",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body); // print whatever's coming back
        console.log("----------------------------------");
        console.log(body);
        res.send(body);
      }
    }
  );
  //   res.send("A whole new ... endpoint");
});

// POST
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/post-test', (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

// app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));

//  stays at bottom to point it to the right port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// postgresql - free to be used with sql -->
// mysql - sql not sure if free
