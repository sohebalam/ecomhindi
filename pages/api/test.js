import connectDB from "../../helpers/connectDB"

connectDB()

export default (req, res) => {
  res.json({ message: "hdfgsdfs!!" })
}
