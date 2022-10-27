import { app } from "../firebase"
import { getAuth, signOut } from "firebase/auth"
import { useAuthContext } from "../lib/authContext"
import { useRouter } from "next/router"

export const Logout = () => {
  const auth = getAuth(app)
  // const { logout } = useAuthContext()
  const handleLogout = async () => {
    console.log("logout",auth)
    await signOut(auth)
  }
  return (
    <>
      <div onClick={handleLogout}>
        Logout
      </div>
    </>
  )
}