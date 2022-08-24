// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3001;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use(
  cookieSession({
    name: 'session',
    keys: ['notsecret', 'maybesecret', 'definitelysecret'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

/******************************************************
 * HELPER FUNCTIONS
 ******************************************************/

 const createOddjob = (title, type, description, date, starttime, endtime, pay) => {
  return db.query(
      'INSERT INTO odd_jobs (title, employer_type, description, date, start_time, end_time, total_pay) VALUES ($1, $2, $3, $4, $5, $6, $7);',
      [title, type, description, date, starttime, endtime, pay]
  );
};

const getOddjobById = (id) => {
  console.log("ID: ", id);
    return db.query(
        'SELECT * FROM odd_jobs WHERE id=$1;',
        [id] // This array will be sanitized for safety.
    ).then((result) => {
      console.log("SELECT * FROM odd_jobs WHERE id=$1;", result.rows);
      return result.rows
    });
};

/******************************************************
 * ROUTES
 ******************************************************/

 app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("sign_up");
});


// NEW FORM
app.get("/oddjob", (req, res) => {
  res.render("odd_job");
});

app.get('/dashboard', (req, res) => {
    console.log("USERID: ",req.session.user_id);
    getOddjobById(req.session.user_id).then(oddjobs => {
        const templateVars = {oddjobs};
        res.render('dashboard', templateVars);
    });
});

// app.get("/favourites", (req, res) => {
//   res.render("favourites");
// });


app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

// FORM SUBMISSION
app.post('/oddjob', (req, res) => {
  const oddjob = req.body;
  console.log(oddjob);
  if (oddjob.type === 'individual') {
    oddjob.type = false;
  } else {
    oddjob.type = true;
  }
  createOddjob(oddjob.title, oddjob.type, oddjob.description, oddjob.date, oddjob.starttime, oddjob.endtime, oddjob.pay).then(() => {
    res.redirect('/dashboard')
  })
});


// app.post("/login", (req, res) => {
//   // console.log(req.body);
//   res.redirect("/");
// });

/******************************************************
 * LISTENER
 ******************************************************/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
