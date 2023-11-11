"use client"
import React, { useEffect } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react"

import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "@/store/slices/authSlice"
import store from "store2"
import Link from "next/link"

export default function App() {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.auth.username)

  useEffect(() => {
    dispatch(login(store("username")))
  }, [])

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">NBA</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/">Home(API)</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/players">Players</Link>
        </NavbarItem>
        <NavbarItem>
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
              <Button
                onClick={() => dispatch(logout())}
                variant="bordered"
                color="danger"
              >
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
    </Navbar>
  )
}
