const express = require('express');
const fs = require('fs');
const path = require('path');

 const app = express();


const PORT = process.env.PORT || 3001;
console.log(PORT)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });


  
  app.get('/api/notes', (req, res)=> {
    console.log("connected")
    const newNoteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(newNoteList);
    console.table(newNoteList);
  });
  
  app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let notelength = (noteList.length).toString();
    
    newNote.id = notelength;
    
    noteList.push(newNote);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
  });
  
  //delete option
  app.delete('api/notes/:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = (req.params.id).toString();
    
    noteList = noteList.filter(selected =>{
      return selected.id != noteId;
    })
    
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
  });
  
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/public/index.html'));
  });
  
  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
  );




// //dependencies
// const fs = require("fs");
// const express = require("express");
// const path = require("path");

// // Sets up the Express App
// const app = express();
// // Sets port for listening and let heroku decide on port, if not, use port 8080
// const PORT = process.env.PORT || 8000;

// //serve images, CSS files, and JavaScript files in a directory named public
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// //route to notes.html
// app.get("/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/notes.html"));
// });

// //route to read the `db.json` file and return all saved notes as JSON.
// app.get("/api/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, "/db/db.json"));
// });

// //route to index.html aka main page

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// //receive a new note to save on the request body, add it to the `db.json` file, 
// //and then return the new note to the client.
// app.post("/api/notes", (req, res) => {
//     let newNote = req.body;
//     let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     let notelength = (noteList.length).toString();

//     //create new property called id based on length and assign it to each json object
//     newNote.id = notelength;
//     //push updated note to the data containing notes history in db.json
//     noteList.push(newNote);

//     //write the updated data to db.json
//     fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
//     res.json(noteList);
// })

// //delete note according to their tagged id.
// app.delete("/api/notes/:id", (req, res) => {
//     let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     let noteId = (req.params.id).toString();

//     //filter all notes that does not have matching id and saved them as a new array
//     //the matching array will be deleted
//     noteList = noteList.filter(selected =>{
//         return selected.id != noteId;
//     })

//     //write the updated data to db.json and display the updated note
//     fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
//     res.json(noteList);
// });


// //listen tot he port when deployed
// app.listen(PORT, () => console.log("Server listening on port " + PORT));

