"use client"
import { RootState } from "@/store"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input } from "@nextui-org/react"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import TeamCard from "./TeamCard"
import { TeamInterface } from "@/types"
import { addTeam } from "@/store/slices/teamSlice"

const TeamModal = ({ teams }: { teams: TeamInterface[] }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TeamInterface>()

  const onSubmit: SubmitHandler<TeamInterface> = (data) => {
    dispatch(addTeam(data))
    reset()
    onOpenChange()
    toast.success("Created a team")
    // console.log("render")
  }

  return (
    <>
      <Button
        variant="bordered"
        color="primary"
        className="mb-5"
        onPress={onOpen}
      >
        Add Team
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Create a Team
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    label="Name"
                    size="sm"
                    isInvalid={errors.name ? true : false}
                    {...register("name", {
                      required: "Team name is required",
                      validate: (data) => {
                        const unique = !teams.filter(
                          (team) =>
                            team.name.toLocaleLowerCase() ===
                            data.toLocaleLowerCase()
                        ).length
                        if (!unique) return "Team name is already taken"
                        return true
                      },
                    })}
                    errorMessage={errors.name?.message}
                  />
                  <Input
                    type="text"
                    label="Country"
                    size="sm"
                    isInvalid={errors.country ? true : false}
                    {...register("country", {
                      required: "Country is required",
                    })}
                    errorMessage={errors.country?.message}
                  />
                  <Input
                    type="text"
                    label="Region"
                    size="sm"
                    isInvalid={errors.region ? true : false}
                    {...register("region", { required: "Region is required" })}
                    errorMessage={errors.region?.message}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const TeamList = () => {
  const teams = useSelector((state: RootState) => state.team.teams)

  return (
    <div>
      {teams.length ? (
        <>
          <TeamModal teams={teams} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((team) => (
              <TeamCard key={team.id} {...team} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col gap-5 min-h-[50vh]">
          <p>No Data!</p>
          <TeamModal teams={teams} />
        </div>
      )}
    </div>
  )
}

export default TeamList
