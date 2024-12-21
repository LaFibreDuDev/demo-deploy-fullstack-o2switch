import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Wrapper O2SWITCH
if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

// Routes
app.get('/', (req, res) => {
  res.json({message: 'Salut les gens !'});
});

// Lancement du serveur
if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}