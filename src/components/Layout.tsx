import React, { ReactNode } from "react"

import Header from "./Header"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <div className="max-w-[1000px] mx-auto w-full py-8 px-5">{children}</div>
    </main>
  )
}

export default Layout
