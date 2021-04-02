import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import baseURL from '../helpers/baseUrl'
const Home = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div className="rootcard" key={product._id}>
          <div className="card pcard">
            <div className="card-image">
              <Image
                src={product.selectedFile}
                width="500rem"
                height="300rem"
              />
            </div>
            <span className="card-title">{product.title}</span>
            <div className="card-content">
              <p>{product.description}</p>
            </div>
            <div className="card-action"> £{product.price}</div>
            <div className="card-action">
              <Link href={"/product/[id]"} as={`/product/${product._id}`}>
                <a>View Product</a>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <Link href="/product">
        <a>go to products</a>
      </Link>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${baseURL}/api/products`)

  const data = await res.json()

  return {
    props: {
      products: data,
    },
  }
}
export default Home
