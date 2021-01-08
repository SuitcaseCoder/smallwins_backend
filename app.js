// video that helped me: https://www.youtube.com/watch?v=kJA9rDX7azM&t=286s
//  article that helped me make post request: https://codeforgeek.com/handle-get-post-request-express-4/

// importing express --imported express.js using npm
const express = require("express");
var request = require("request");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
// same default port as react (3000), so change it to 5000
const port = 5000;

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
