"use client"
import React, { useEffect } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
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
import Image from "next/image"

export default function Header() {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.auth.username)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  useEffect(() => {
    const username = Cookies.get("username")
    username && dispatch(login(username))
    dispatch(setTeams(store("teams") || []))
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logout successfully!")
  }

  return (
    <Navbar
      disableAnimation
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        {/* <AcmeLogo /> */}
        <Link href={"/"}>
          <div className="w-7 h-7 relative">
            <Image src={"/images/logo.png"} alt="logo" fill sizes="8vw" />
          </div>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Link href={"/"}>
          <div className="w-7 h-7 relative">
            <Image src={"/images/logo.png"} alt="logo" fill sizes="8vw" />
          </div>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link href="/">Players</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/teams"}>
          <Link href="/teams">Teams</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {username ? (
          <>
            <NavbarItem>
              <p className="font-bold">
                <span className="hidden md:inline">Signed in as </span>
                <span className="text-sky-500">{username}</span>
              </p>
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

      <NavbarMenu>
        <NavbarItem isActive={pathname === "/"}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            Players
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/teams"}>
          <Link href="/teams" onClick={() => setIsMenuOpen(false)}>
            Teams
          </Link>
        </NavbarItem>
      </NavbarMenu>
      <div className="fixed">
        <ToastContainer />
      </div>
    </Navbar>
  )
}
