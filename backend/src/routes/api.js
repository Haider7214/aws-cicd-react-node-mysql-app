const express = require('express');
const router = express.Router();
const createPool = require('../db/mysql'); // your SSM-based MySQL pool

// Get all authors
router.get('/authors', async (req, res) => {
  try {
    const db = await createPool();
    const [rows] = await db.query('SELECT * FROM author');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all books
router.get('/books', async (req, res) => {
  try {
    const db = await createPool();
    const [rows] = await db.query(`
      SELECT b.id, b.title, b.releaseDate, b.pages, b.description,
             a.name AS author
      FROM book b
      LEFT JOIN author a ON b.authorId = a.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create author
router.post('/authors', async (req, res) => {
  const { name, birthday, bio } = req.body;
  try {
    const db = await createPool();
    const [result] = await db.query(
      'INSERT INTO author (name, birthday, bio, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
      [name, birthday, bio]
    );
    res.status(201).json({ id: result.insertId, name, birthday, bio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create book
router.post('/books', async (req, res) => {
  const { title, releaseDate, pages, description, authorId } = req.body;
  try {
    const db = await createPool();
    const [result] = await db.query(
      'INSERT INTO book (title, releaseDate, pages, description, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [title, releaseDate, pages, description, authorId]
    );
    res.status(201).json({ id: result.insertId, title, releaseDate, pages, description, authorId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
