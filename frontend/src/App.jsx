import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:4000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content
      })
    });

    const newNote = await response.json();

    setNotes((prev) => [newNote, ...prev]);

    setTitle("");
    setContent("");
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <header className="header">
        <div>
          <div className="logo">✦ QuickNotes</div>
          <p>Capture it. Don't forget it.</p>
        </div>

        <div className="badge">
          ● API Connected
        </div>
      </header>

      <main>

        <section className="hero">
          <h1>
            Your ideas,
            <span> organized.</span>
          </h1>

          <p>
            A tiny full-stack notes app built with React + Node.js.
          </p>
        </section>

        <section className="create-card">
          <h2>＋ Create a note</h2>

          <form onSubmit={addNote}>
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write something interesting..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit">
              Add Note →
            </button>
          </form>
        </section>

        <div className="notes-header">
          <h2>My Notes</h2>

          <input
            className="search"
            type="text"
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredNotes.length === 0 ? (
          <div className="empty">
            <div>📝</div>
            <h3>No notes found</h3>
            <p>Create your first note above.</p>
          </div>
        ) : (
          <section className="notes-grid">
            {filteredNotes.map((note) => (
              <article className="note-card" key={note.id}>

                <div className="note-top">
                  <div className="note-icon">✦</div>

                  <button
                    className="delete"
                    onClick={() => deleteNote(note.id)}
                  >
                    🗑
                  </button>
                </div>

                <h3>{note.title}</h3>

                <p>{note.content}</p>

                <small>QuickNotes</small>
              </article>
            ))}
          </section>
        )}

      </main>

      <footer>
        Built for the Git Workshop ⚡
      </footer>

    </div>
  );
}

export default App;