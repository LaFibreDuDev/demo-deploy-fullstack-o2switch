import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
  res.send('Salut les gens !');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});