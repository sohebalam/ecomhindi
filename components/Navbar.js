import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import cookie from "js-cookie"
const Navbar = () => {
  const cookieuser = parseCookies()
  const router = useRouter()
  const user = cookieuser.user ? JSON.parse(cookieuser.user) : ""

  function isActive(route) {
    if (route == route.pathname) {
      return "active"
    } else ""
  }
  return (
    <>
      <nav>
        <div className=" nav-wrapper #1565c0 blue darken-3">
          <div className="narrowcontainer">
            <Link href="/">
              <a className="brand-logo">OpenFreeUni</a>
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className={isActive("/cart/cart")}>
                <Link href="/cart/cart">
                  <a>Cart</a>
                </Link>
              </li>
              {(user.role === "admin" || user.role === "root") && (
                <li className={isActive("/create")}>
                  <Link href="/create">
                    <a>Create</a>
                  </Link>
                </li>
              )}
              {user ? (
                <>
                  <li className={isActive("/account")}>
                    <Link href="/account">
                      <a>Account</a>
                    </Link>
                  </li>
                  <li>
                    <button
                      className=" #42a5f5 blue lighten-1"
                      onClick={() => {
                        cookie.remove("token")
                        cookie.remove("user")
                        router.push("/login")
                      }}
                    >
                      <a>Logout</a>
                    </button>
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
