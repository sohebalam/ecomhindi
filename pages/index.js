import Head from "next/head"
import Link from "next/link"

const Home = ({ message }) => {
  return (
    <>
      <h1>Next is awesome</h1>
      <h2>{message}</h2>
      <Link href="/product">
        <a>go to products</a>
      </Link>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/test")
  const data = await res.json()

  return {
    props: { message: data.message },
  }
}

export default Home
