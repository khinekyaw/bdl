import React from "react"

import RouteGuard from "@/components/RouteGard"
import LoginForm from "@/components/LoginForm"

const LoginPage = () => {
  return (
    <RouteGuard required="unauth">
      <div className="w-full min-h-[60vh] flex justify-center items-center">
        <LoginForm />
      </div>
    </RouteGuard>
  )
}

export default LoginPage
