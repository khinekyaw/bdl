"use client"
import { RootState } from "@/store"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import TeamCard from "./TeamCard"

const TeamList = () => {
  const dispatch = useDispatch()
  const teams = useSelector((state: RootState) => state.team.teams)

  return (
    <div className="grid grid-cols-2 gap-4">
      {teams.map((team) => (
        <TeamCard key={team.id} {...team} />
      ))}
    </div>
  )
}

export default TeamList
