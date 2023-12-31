"use client"
import React, { useEffect } from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { useDispatch } from "react-redux"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { login } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"

type Inputs = {
  username: string
}

const LoginForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login(data.username))
    router.replace("/")
  }

  useEffect(() => {
    if (errors.username) {
      toast.error(errors.username.message, { position: "top-center" })
    }
  }, [errors])

  return (
    <form className="max-w-[400px] w-full" onSubmit={handleSubmit(onSubmit)}>
      <Card className="py-4 h-fit">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h1 className="font-bold text-3xl mb-3">Login</h1>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Input
            placeholder="Username"
            size="sm"
            className="mb-4"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be a least 3 characters long",
              },
            })}
          ></Input>
          <Button color="primary" type="submit">
            Login
          </Button>
        </CardBody>
      </Card>
      {/* <ToastContainer /> */}
    </form>
  )
}

export default LoginForm
