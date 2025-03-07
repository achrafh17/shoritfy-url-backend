const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "https://shoritfy-url-backend-production.up.railway.app"; 

app.use(express.json());
app.use(cors());

const urls = {};

// Page d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de raccourcissement d'URL !");
});

// Route pour raccourcir une URL
app.post("/app", async (req, res) => {
  const url = req.body.url;
  
  if (!url) {
    return res.status(400).json({ error: "Aucune URL fournie." });
  }

  const key = crypto.randomBytes(5).toString("hex");
  urls[key] = url;
  
  res.json({ shorturl: `${BASE_URL}/${key}` });
});

// Redirection vers l'URL originale
app.get("/:key", (req, res) => {
  const key = req.params.key;
  
  if (urls[key]) {
    return res.redirect(urls[key]);
  } else {
    return res.status(404).json({ error: "URL non trouvée." });
  }
});

app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
