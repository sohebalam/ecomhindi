import Head from "next/head"
import Link from "next/link"
import Image from "next/image"

const Home = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div className="card pcard" key={product._id}>
          <div className="card-image">
            <Image src={product.selectedFile} width="500rem" height="300rem" />
          </div>
          <span className="card-title">{product.title}</span>
          <div className="card-content">
            <p>{product.description}</p>
          </div>
          <div className="card-action">{product.price}</div>
        </div>
      ))}

      <Link href="/product">
        <a>go to products</a>
      </Link>
    </>
  )
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/products")
//   const data = await res.json()

//   return {
//     props: { products: data },
//   }
// }
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/products`)

  const data = await res.json()

  return {
    props: {
      products: data,
    },
  }
}
export default Home
