const express = require('express');
const fs = require('fs');
const path = require('path');
//const notesData = require('./db/db.json');
const app = express();

// Sets port for listening and let heroku decide on port, if not, use port 8080
const PORT = process.env.PORT || 3001;
console.log(PORT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

  //route to read the `db.json` file and return all saved notes as JSON.
app.get('/notes', (req, res) => res.sendFile('./db/db.json'));
//console.log(./db/db.json);


//GET request to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//receive a new note to save on the request body, add it to the `db.json` file, 
//and then return the new note to the client.
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();

    //create new property called id based on length and assign it to each json object
    newNote.id = notelength;
    //push updated note to the data containing notes history in db.json
    noteList.push(newNote);

    //write the updated data to db.json
    fs.writeFileSync('npm stanotesData', JSON.stringify(noteList));
    res.json(noteList);
})
  
// app.post('/api/notes', (req, res) => res.json(notesData));




  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);