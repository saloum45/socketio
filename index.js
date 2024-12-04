const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Configuration de base
const app = express();
app.use(cors());

// Crée le serveur HTTP
const server = http.createServer(app);

// Initialise Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Autorise toutes les origines
    methods: ["GET", "POST"],
  },
});

// Écoute les connexions des clients
io.on("connection", (socket) => {
  console.log(`Utilisateur connecté :`);

  // Réception de la position de l'utilisateur
  socket.on("notifier", (data) => {
    console.log("notification reçu :", data);

    // Diffusion de la position aux autres clients
    socket.broadcast.emit("notifier", data);
  });

  // Gestion de la déconnexion
  socket.on("disconnect", () => {
    console.log(`Utilisateur déconnecté `);
  });
});

// Lancement du serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur Socket.io en cours d'exécution sur le port ${PORT}`);
});
