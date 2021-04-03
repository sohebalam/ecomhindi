import connectDb from "../../../helpers/connectDb"
import User from "../../../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDb()

export default async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "All fields are required" })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const doMatch = await bcrypt.compare(password, user.password)

    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })

      const { name, role, email } = user
      return res
        .status(201)
        .json({ message: "Login Success", token, user: { name, role, email } })
    } else {
      return res.status(401).json({ error: "Credentials not correct" })
    }
  } catch (error) {
    console.log(error)
  }
}
