const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const app = express();

const PORT = process.env.PORT || 3001;
console.log(PORT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//route to notes.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

  //route to read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => res.json(notesData));
console.log(reviewsData);


// GET request to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
  
app.post('/api/notes', (req, res) => res.json(notesData));




  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);