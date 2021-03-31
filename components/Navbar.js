import Link from "next/link"
import { useRoute } from "next/router"
const Navbar = () => {
  function isActive(route) {
    if (route == route.pathname) {
      return "active"
    } else ""
  }
  return (
    <>
      <nav>
        <div className="nav-wrapper #1565c0 blue darken-3">
          <Link href="/">
            <a className="brand-logo">Logo</a>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={isActive("/login")}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li className={isActive("/register")}>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </li>
            <li className={isActive("/create")}>
              <Link href="/create">
                <a>Create</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
