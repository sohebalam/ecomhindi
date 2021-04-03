import connectDB from "../../helpers/connectDB"
import Product from "../../models/productModel"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res)
      break
    case "POST":
      await createProduct(req, res)
      break
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}

const createProduct = async (req, res) => {
  const { title, price, description, selectedFile } = req.body

  try {
    if (!title || !price || !description || !selectedFile) {
      return res.status(422).json({ error: "Please add all the fields" })
    }
    const product = await new Product({
      title,
      price,
      description,
      selectedFile: selectedFile,
    }).save()
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: "internal server error" })
    console.log(err)
  }
}
