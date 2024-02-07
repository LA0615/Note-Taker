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
app.use(express.static("public"));

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

//Get route for notes html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  
  // Read the JSON file
  const notes = require("./db/db.json");

  // Find the index of the note with the given ID
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  // If the note is found, remove it from the array
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    // Write the updated notes array back to the JSON file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    res.json({ message: "Note deleted successfully." });
  } else {
    res.status(404).json({ error: "Note not found." });
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
