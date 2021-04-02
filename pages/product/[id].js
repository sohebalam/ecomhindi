import { useRouter } from "next/router"
import baseURL from "../../helpers/baseUrl"
import Image from "next/image"
import {useRef,useEffect} from 'react'
const Product = ({ product }) => {
  const router = useRouter()
  const modalRef = useRef(null)

  useEffect(() => {
  M.Modal.init(modalRef.current)
  }, [])


  if (router.isFallback) {
    return <h3>Loading...</h3>
  }

  const getModal = ()=>{
    return(
      <div id="modal1" className="modal" ref={modalRef}>
    <div className="modal-content">
      <h4>{product.title}</h4>
      <p>Are you sure you want to delete this?</p>
    </div>
    <div className="modal-footer">
    <button className="btn waves-effect waves-light " type="submit" name="action">Cancel
  </button>
    <button onClick={()=>deleteProduct()} className="btn waves-effect waves-light #ff1744 red accent-3" type="submit" name="action">Yes
  </button>
      
    </div>
  </div>
    )
  }

const deleteProduct = async()=>{
 const res= await fetch(`${baseURL}/api/product/${product._id}`,{
    method:"DELETE"
  })
   await res.json()
  router.push('/')
}
  return (
    <div className="container center-align">
      <h1>{product.title}</h1>
      <Image src={product.selectedFile} width='500rem' height='400rem'/>
      <h5>£{product.price}</h5>
      {/* <input type='number' style={{width:'400px', margin:'10px'}} min='1' placeholder='Quantity'/> */}
      {/* <button className="btn waves-effect waves-light" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
  </button> */}
      <p className='left-align'>
        {product.description}
      </p>
       <button data-target="modal1" className="btn modal-trigger btn waves-effect waves-light #ff1744 red accent-3" type="submit" name="action">Delete
    <i className="material-icons right">delete</i>
  </button>
  {getModal()}
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
  const res = await fetch(`${baseURL}/api/product/${id}`)
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
