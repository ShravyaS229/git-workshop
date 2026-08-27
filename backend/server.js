import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    title: "Git Workshop",
    content: "Learn Git, GitHub and collaboration 🚀"
  },
  {
    id: 2,
    title: "My First Note",
    content: "This note came from the backend!"
  }
];

// GET all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// ADD a note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required"
    });
  }

  const newNote = {
    id: Date.now(),
    title,
    content
  };

  notes.unshift(newNote);

  res.status(201).json(newNote);
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter((note) => note.id !== id);

  res.json({
    message: "Note deleted successfully"
  });
});

app.get("/", (req, res) => {
  res.send("QuickNotes API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});