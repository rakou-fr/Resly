const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const User = require("../models/User")

// CREATE USER
router.post("/create", async (req, res) => {
  const { identifier, password } = req.body

  try {
    // Vérifie si user existe déjà
    const existingUser = await User.findOne({ identifier })
    if (existingUser) {
      return res.status(400).json({ message: "Identifiant déjà utilisé" })
    }

    // Hash mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Générer token permanent sécurisé
    const permanentToken = crypto.randomBytes(48).toString("hex")

    const user = new User({
      identifier,
      password: hashedPassword,
      permanentToken,
      isValid: true,
    })

    await user.save()

    res.json({
      message: "Utilisateur créé",
      permanentToken,
    })
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})


router.post("/login", async (req, res) => {
  const { identifier, password } = req.body

  try {
    const user = await User.findOne({ identifier })

    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" })
    }

    if (!user.isValid) {
      return res.status(403).json({ message: "Compte désactivé" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" })
    }

    res.json({
      message: "Connexion réussie",
      token: user.permanentToken,
      user: {
        id: user._id,
        identifier: user.identifier,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

module.exports = router
