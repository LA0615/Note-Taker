const express = require("express");
const path = require("path");
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Get route for HTML index
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

//Get route for notes html 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
);

//Get Route for API notes
app.get('/api/notes', (req, res) => {

res.json(db)
 });

//Post route for  APIT notes
app.post('/api/notes', (req, res) => {


  });

//Delete requst for api notes---extra credit portion 



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);