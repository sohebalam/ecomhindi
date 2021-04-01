import { useRouter } from "next/router"

const Product = ({ product }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <h3>Loading...</h3>
  }
  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  )
}

export default Product

// export async function getServerSideProps({ params: { id } }) {
//   const res = await fetch(`http://localhost:3000/api/product/${id}`)
//   const data = await res.json()

//   return {
//     props: { product: data },
//   }
// }
export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`http://localhost:3000/api/product/${id}`)
  const data = await res.json()

  return {
    props: { product: data },
  }
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "602beec04328b23988ec038c" } }],
    fallback: true,
  }
}
