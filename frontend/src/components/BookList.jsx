import React from "react";

const BookList = ({ books }) => {
  return (
    <section>
      <h2>Books</h2>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} by {b.author} - {b.pages} pages
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BookList;
