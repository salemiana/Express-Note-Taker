
//require dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//creates a new express application
const app = express();

// takes the PORT by reading the Environment Variable or the one already set.
const PORT = process.env.PORT || 3001;
console.log(PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log("connected");
  //using a synchronous version of fs.readFile() and doesn't require a callback function
  const newList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(newList);
  console.table(newList);
});

app.post("/api/notes", (req, res) => {
  let newNoteList = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let notelength = noteList.length.toString();

  newNoteList.id = notelength;

  noteList.push(newNoteList);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

//delete option
// app.delete("api/notes/:id", (req, res) => {
//   let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//   let listId = req.params.id.toString();

//   noteList = noteList.filter((selected) => {
//     return selected.id != listId;
//   });

//   fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
//   res.json(noteList);
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);


