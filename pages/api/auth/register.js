import connectDb from "../../../helpers/connectDb"
import User from "../../../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDb()

export default async (req, res) => {
  const { email, password, name } = req.body

  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "All fields are required" })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" })
    }
    const HashedPassword = await bcrypt.hash(password, 12)
    const newUser = await new User({
      name,
      email,
      password: HashedPassword,
    }).save()

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    const { name, role, email } = newUser
    return res
      .status(201)
      .json({ message: "New user created", token, user: { name, role, email } })
  } catch (error) {
    console.log(error)
  }
}
