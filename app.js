// video that helped me: https://www.youtube.com/watch?v=kJA9rDX7azM&t=286s
//  article that helped me make post request: https://codeforgeek.com/handle-get-post-request-express-4/

require('dotenv').config()

// importing express --imported express.js using npm
const express = require("express");
// require mysql
var mysql = require("mysql2");

var request = require("request"); 
const router = express.Router();

// for password hash
const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
// same default port as react (3000), so change it to 5000
const port = 5000;

// ----------- MYSQL CODE START --------------
//  with major help from this video: https://www.youtube.com/watch?v=EN6Dx22cPRI&list=PL47Uf6xF4760GqrLtaKm4bEKNY7u7aZQw&index=5

// import for the registration form
const cors = require("cors");
const { json } = require('body-parser');

// // app.use json for the registration form
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  key: "userId",
  secret: "my-secret-101",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  }
}))



app.get('/createdb', (req,res) =>{
  // let sql = 'CREATE DATABASE IF NOT EXISTS smallwinsdb';
  let sql = `CREATE TABLE IF NOT EXISTS users(id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), first_name VARCHAR(255), last_name VARCHAR(255), username VARCHAR(255), email VARCHAR(320), hash VARCHAR(320), FOREIGN KEY (id) REFERENCES wins (id))`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    res.send('database created');
  })
})


const db = mysql.createConnection({
  // properties ...
  // host: "localhost",
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  // change this eventually to a custom password - go look at your notes
  password: process.env.DB_PASSWORD,
  // will change once we have a db
  database: process.env.DB_NAME
});


db.connect((err) => {
  // if error
  if (err) {
    console.log(`err from app.js in sw_backend: ${err}`);
    throw err;
  } else {
    console.log("Connected");
  }
});


// FETCH REQUESTS 

// --- MOVED THIS HERE FROM BELOW 'GET ALL TASKS'
 //app.get('/createwinstable', (req, res) => { // idk if this should be createwinstable or just /
//  app.get('/', (req, res) => {

//  let sql = 'CREATE TABLE IF NOT EXISTS wins (id INT NOT NULL AUTO_INCREMENT, win_title VARCHAR(255), PRIMARY KEY (id));';
//  db.query(sql, (err, result) => {
//    if(err){
//      throw err
//    } else {
//    res.send('~~~ TABLE CREATED ~~~');
//    }
//  })
// })


// get all wins
app.get('/allwins', function(req,res){
  // MAYBE: SELECT * FROM wins_table WHERE ... ((not so sure abou this part, but where user_id matches or is equal to the id being passed in from the user loggedin, so maybe add a loggedin id to the state in frontend if user is loggedin, so we can pass that around in the backend))
 db.query("SELECT * FROM wins", function(error, rows, fields){
    if(!!error){
      console.log(error);
      console.log('Error in query');
   } else {
      console.log('ROWS : ----> ');
      console.log(rows);
    res.send(rows);
}}
)
})


// -- INSERT WIN 1
app.post('/addwin1', (req,res)  => {
// whatever is being passed in as a new small win (from input)
let addedWin = req.body;
  let sql = `INSERT INTO wins (win_title) VALUES ('${addedWin.win_title}');`;
  // let query =
   db.query(sql, addedWin.win_title, (err, result) => {
    if(err) throw err;
    res.send();
    })
});

// //-- SELECT SMALL WIINS
app.get('/getsmallwins', (req,res) => {
  // app.get('/', (req,res) => {
let sql = 'SELECT * FROM wins';
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    // console.log(results);
    res.send('small wins fetched');
  })
});

 // //-- FETCH INDIVIDUAL WINS
app.get('/getsmallwins/:id', (req,res) => {
  let sql = `SELECT * FROM smallwins WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    // console.log(result);
    res.send('small win fetched - just one');
  })
});


 // //-- UPDATE WINS
app.get('/updatesmallwin/:id', (req,res) => {
  let newWinMsg = "new small win message to be updated to";
  let sql = `UPDATE wins SET message = '${newWinMsg}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    // console.log(result);
    res.send('small win updated - just one');
  })
});

// //-- DELETE WIN
app.delete("/deletesmallwin/:id", (req, res) => {
  let newWinMsg = "new small win message to be updated to";
  let sql = `DELETE FROM wins WHERE win_id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(newWinMsg);
  });
});

// // -- USER REGISTRATION 
// // : https://www.youtube.com/watch?v=W-sZo6Gtx_E&t=353s
//  let sql = 'CREATE TABLE IF NOT EXISTS wins (id INT NOT NULL AUTO_INCREMENT, win_title VARCHAR(255), PRIMARY KEY (id));';


app.post('/register', (req, res)=> {
 console.log('register worked backend');
//  console.log('register response in backend: ' + res, req);
 // firstname comes from front end --> signup.js file in the register function
  const firstname = req.body.first_name;
  const lastname = req.body.last_name;
  const username = req.body.username;
  const email = req.body.email;
  const password =  req.body.password;

  // bcrypt for password hashing
  bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err){
        console.log(err)
      }

      // users is the name of the database (user table in sql)
      // EX: INSERT INTO nameOfTable (columnName1, columnName2, etc.) VALUES (valuePassedIn1, valuePassedIn2, etc.)
      // let sql = `INSERT INTO users (first_name, last_name, username, email, hash) VALUES (${firstname}, ${lastname}, ${username}, ${email}, ${hash})`;
      // db.query(sql, [firstname, lastname, username, email, hash],
      // [firstname, lastname, username, email, hash],
      db.query(`INSERT INTO users (first_name, last_name, username, email, hash) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hash}');`,[firstname, lastname, username, email, hash], 
      (err, result, fields)=> {
        
        console.log("--fields in signup hash--")
        console.log(fields);
        console.log("--result in signup hash--")
        console.log(result);
        console.log("--err in signup--")
        console.log(err)

        if (err) throw err;
        res.send({message: 'users saved, I think'});
      })
  });

})

// // --USER LOGIN
// // : https://www.youtube.com/watch?v=W-sZo6Gtx_E&t=353s
// // : https://youtu.be/sTHWNPVNvm8 --> cookies, sessions, password hash

// gets called when login endpoint is hit
app.get('/login', (req, res) => {
  console.log(`WE ARE HERE: response in backend from making get request to /login: `);
  if(req.session.user){
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
})


// gets called when login button gets clicked
app.post('/login', (req, res) => {
  console.log(`___________post request from backend to /login`);
  console.log(req.body.username);
    // firstname comes from front end --> signup.js file in the register function
    const username = req.body.username;
    const password = req.body.password;
  
    // users is the name of the database (user table in sql)
    db.query(
      `SELECT * FROM users WHERE username = ${username}`, 
      // username, 
    (err, result)=> {
      console.log("--- result ---");
      console.log(JSON.stringify(result));
      // if err occurs, log the error
      if(err){
      res.send({err:err})
      } 
      else 

       // if there is a result ( a user with that username and password), send that result back to front end
      if (result.length > 0 ) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response){
            req.session.user = result;
            console.log(req.session.user);
             res.send(result)
          } else {
            // if no user found then send back a message saying no user found
        res.send({message: "no user found/wrong password"})
          }
        })
      } else {
        // if no user found then send back a message saying no user found
        res.send({message: "user doesn't exist"})
      }
      
    } )
})

// app.listen //should go here if using mysql

// ----------- MYSQL CODE END --------------

//  ----------------- **THE CODE I USED BEFORE ADDING MYSQL CODE** ----------------
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// open up http://localhost:5000/ on web browser and you should see 'hello world'
// you can also test in postman

// I can create a brand new endpoint here
// and test it in Postman
// app.get("/newEndpoint", (req, res) => {
//   res.send("A whole new ... endpoint");
// });

// //  HERE'S WHAT I WOULD NEED FOR SMALL WINS
// app.get("/smallwins", (req, res) => {
//   request(
//     "https://jsonplaceholder.typicode.com/comments?postId=1",
//     function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         //console.log(body); // print whatever's coming back
//         console.log("----------------------------------");
//         console.log(body);
//         res.send(body);
//       }
//     }
//   );
//   //   res.send("A whole new ... endpoint");
// });

// POST
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/post-test', (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

// app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));

//  stays at bottom to point it to the right port
app.listen(port, () => {
  console.log(`Small Wins App listening at http://localhost:${port}`);
});

// postgresql - free to be used with sql -->
// mysql - sql not sure if free
