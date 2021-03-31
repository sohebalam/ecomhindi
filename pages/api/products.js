import connectDB from "../../helpers/connectDB"
import Product from "../../models/Product"

connectDB()

export default async (req, res) => {
  const products = await Product.find()

  res.status(200).json(products)
}
