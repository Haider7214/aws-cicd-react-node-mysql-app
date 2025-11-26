import React from "react";

const AuthorList = ({ authors }) => {
  return (
    <section>
      <h2>Authors</h2>
      <ul>
        {authors.map((a) => (
          <li key={a.id}>{a.name} ({a.birthday})</li>
        ))}
      </ul>
    </section>
  );
};

export default AuthorList;
