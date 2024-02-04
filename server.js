const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Get route for HTML notes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
);

//Get route for index html 
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

//Get Route for API notes
app.get('/api/notes', (req, res) => {


 });

//Post route for  APIT notes
app.post('/api/notes', (req, res) => {


  });

//Delete requst for api notes---extra credit portion 



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);