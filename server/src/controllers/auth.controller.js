import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Champs manquants" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" })
  }
}
