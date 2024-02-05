const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Get route for HTML index
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

//Get route for notes html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "notes.html"))
);

// Get Route for API notes
app.get("/api/notes", (req, res) => {
  res.json(db);
});

//Post route for  API notes
app.post("/api/notes", (req, res) => {
  const note = req.body;
  note.id = uuidv4(); // Generate unique ID
  db.push(note);
  console.log(db, note);
  const dbPath = path.join(__dirname, "db", "db.json");

  fs.writeFile(dbPath, JSON.stringify(db, null, 2), function (err) {
    if (err) throw err;
    res.json(db);
  });
});

//Delete requst for api notes---extra credit portion

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
//"./db/db.json",
