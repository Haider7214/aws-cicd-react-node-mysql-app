import React, { useEffect, useState } from "react";
import "./App.css";
import AuthorList from "./components/AuthorList";
import BookList from "./components/BookList";

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.error(err));

    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>React + Node + MySQL Multi-Tier App</h1>
      </header>
      <AuthorList authors={authors} />
      <BookList books={books} />
    </div>
  );
}

export default App;
