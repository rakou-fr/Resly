const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", require("./routes/auth"))

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.log(err))

// Lancement serveur
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`))
