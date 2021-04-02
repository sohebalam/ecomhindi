import Link from "next/link"
import { useState } from "react"
import baseURL from "../helpers/baseUrl"
import FileBase from "react-file-base64"

const Create = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseURL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        selectedFile,
        description,
      }),
    })
    const res2 = await res.json()
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" })
    } else {
      M.toast({ html: "Product saved", classes: "green" })
    }
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
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setSelectedFile({ selectedFile: base64 })}
        />

        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
        {/* <img
          className="responsive-img"
          src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
        /> */}
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
