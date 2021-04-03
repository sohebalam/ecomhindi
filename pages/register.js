import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import baseURL from "../helpers/baseUrl"
import cookie from "js-cookie"
const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const userRegister = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const res2 = await res.json()
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" })
    } else {
      M.toast({ html: res2.message, classes: "green" })
      console.log(res2)
      cookie.set("token", res2.token)
      cookie.set("user", res2.user)
      router.push("/account")
      // router.push("/login")
    }
  }

  return (
    <div className="container card authcard center-align">
      <h3>Register</h3>
      <form onSubmit={(e) => userRegister(e)}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          type="submit"
        >
          Register
          <i className="material-icons right">forward</i>
        </button>
        <Link href="/login">
          <a>
            <h5>Already have a account ?</h5>
          </a>
        </Link>
      </form>
    </div>
  )
}

export default Register
