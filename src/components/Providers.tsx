"use client"
import { NextUIProvider } from "@nextui-org/react"
import React, { ReactNode } from "react"
import { Provider } from "react-redux"
import NextTopLoader from "nextjs-toploader"

import { store } from "@/store"

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        {children}
        <NextTopLoader />
      </NextUIProvider>
    </Provider>
  )
}

export default Providers
