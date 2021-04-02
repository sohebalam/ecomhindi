import Link from "next/link"
import { useState } from "react"
const Create = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title, price, description, selectedFile)
  }

  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        title="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <input
        type="text"
        title="price"
        placeholder="Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value)
        }}
      />

      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
        <img
          className="responsive-img"
          src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
        />
      </div>

      <textarea
        className="materialize-textarea"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button className="btn waves-effect waves-light" type="submit">
        Submit
        <i className="material-icons right">send</i>
      </button>
    </form>
  )
}

export default Create
