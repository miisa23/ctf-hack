import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

// "/" → index.html, "/events.html", etc.
app.use(express.static(path.join(__dirname, '../pages')));
// "/pages/events.html" (tes liens HTML actuels)
app.use('/pages', express.static(path.join(__dirname, '../pages')));
// "/styles/index.css"
app.use('/styles', express.static(path.join(__dirname, '../styles')));

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ ok: true, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Database connection failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));