"use client"
import React, { useEffect } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import store from "store2"

import { login, logout } from "@/store/slices/authSlice"
import { RootState } from "@/store"
import { setTeams } from "@/store/slices/teamSlice"

export default function App() {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.auth.username)
  const pathname = usePathname()

  useEffect(() => {
    const username = Cookies.get("username")
    username && dispatch(login(username))
    dispatch(setTeams(store("teams") || []))
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logout successfully!", { position: "top-center" })
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">NBA</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link href="/">Home(API)</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/players"}>
          <Link href="/players">Players</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/teams"}>
          <Link href="/teams">Teams</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {username ? (
          <>
            <NavbarItem>
              <p className="font-bold">Signed in as {username}</p>
            </NavbarItem>
            <NavbarItem>
              <Button onClick={handleLogout} variant="bordered" color="danger">
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href="/login" variant="bordered">
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <ToastContainer />
    </Navbar>
  )
}
