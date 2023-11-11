import React from "react"
import { Card, CardBody } from "@nextui-org/card"
import Image from "next/image"
import { Button } from "@nextui-org/react"

import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "@nextui-org/react"
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

import { TeamInterface } from "@/types"
import { deleteTeam, editTeam, flipPlayer } from "@/store/slices/teamSlice"

const TeamModal = ({ team }: { team: TeamInterface }) => {
  const dispatch = useDispatch()
  const teams = useSelector((state: RootState) => state.team.teams)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamInterface>({ defaultValues: team })

  const onSubmit: SubmitHandler<TeamInterface> = (data) => {
    dispatch(editTeam(data))
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
        Edit
      </Button>
      <Modal
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Team
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-3 flex-wrap flex-col lg:flex-row">
                    <div className="flex-1 lg:w-auto w-full">
                      <input
                        className="border-1 p-2 rounded-lg w-full"
                        type="text"
                        placeholder="Team Name"
                        {...register("name", {
                          required: "Team name is required",
                          validate: (data) => {
                            if (team.name === data) return true

                            const unique = !teams.filter(
                              (team) =>
                                team.name.toLocaleLowerCase() ===
                                data.toLocaleLowerCase()
                            ).length
                            if (!unique) return "Team name is already taken"
                            return true
                          },
                        })}
                      />
                      {errors.name ? (
                        <small className="text-red-400 mb-1 block">
                          {errors.name.message}
                        </small>
                      ) : null}
                    </div>

                    <div className="flex-1 lg:w-auto w-full">
                      <input
                        className="border-1 p-2 rounded-lg w-full"
                        type="text"
                        placeholder="Country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      />
                      {errors.country ? (
                        <small className="text-red-400 mb-1 block">
                          {errors.country.message}
                        </small>
                      ) : null}
                    </div>
                    <div className="flex-1 lg:w-auto w-full">
                      <input
                        className="border-1 p-2 rounded-lg w-full"
                        type="text"
                        placeholder="Region"
                        {...register("region", {
                          required: "Region is required",
                        })}
                      />
                      {errors.region ? (
                        <small className="text-red-400 mb-1 block">
                          {errors.region.message}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="font-bold mb-4 text-xl">Players</p>
                    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2">
                      {team.players.length ? (
                        team.players.map((player) => (
                          <div
                            key={player.id}
                            className="border p-3 rounded-lg flex justify-between"
                          >
                            <p>
                              {player.first_name} {player.last_name}
                            </p>
                            <Button
                              color="primary"
                              variant="bordered"
                              onClick={() => {
                                dispatch(flipPlayer({ player, teamId: NaN }))
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-center col-span-full">No data</p>
                      )}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Save
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

const TeamCard = ({ id, name, players, region, country }: TeamInterface) => {
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteTeam(id))
  }

  return (
    <Card className="p-1">
      <CardBody className="overflow-visible">
        <div className="flex gap-3">
          <div className="w-20 h-120 relative">
            <Image
              alt={name}
              className="object-cover rounded-xl w-full h-full"
              src="/images/team.webp"
              fill
              sizes="20vw"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-2xl">{name}</h1>
            <p>
              {region}, {country}
            </p>
            <p>Total payers: {players.length}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="bordered" color="danger" onPress={onDelete}>
              Delete
            </Button>
            <TeamModal team={{ id, name, players, region, country }} />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default TeamCard
