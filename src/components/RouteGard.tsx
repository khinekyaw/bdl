import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export interface RouteGardInterface {
  children: ReactNode
  required?: "auth" | "unauth" | null
}

function RouteGuard({ children, required = null }: RouteGardInterface) {
  const cookieStore = cookies()
  const username = cookieStore.get("username")

  console.log(username?.value)

  if (required === "unauth") {
    if (username?.value) {
      redirect("/")
    }
  } else if (required === "auth") {
    if (!username?.value) {
      redirect("/")
    }
  }

  return <>{children}</>
}

export default RouteGuard
