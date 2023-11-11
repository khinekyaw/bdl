import React from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import Image from "next/image"

import { PlayerInterface, SelectInterface, TeamInterface } from "@/types"
import { Select, SelectItem } from "@nextui-org/react"

export default function PlayerCard({
  id,
  first_name,
  last_name,
  position,
  selectData,
  currentTeam,
  onSelect,
}: PlayerInterface & {
  currentTeam: TeamInterface | null
  selectData: SelectInterface[]
  onSelect: (teamId: number) => void
}) {
  return (
    <Card className="p-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Position - {position}</p>
        <small className="text-default-500">Id {id}</small>
        <h4 className="font-bold text-large">
          {first_name} {last_name}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="w-full aspect-video relative mb-3">
          <Image
            alt={first_name + last_name}
            className="object-cover rounded-xl w-full h-full"
            src="/images/nba-symbol.jpg"
            fill
            sizes="30vw"
          />
        </div>

        <select
          defaultValue={currentTeam?.id}
          className="border-1 rounded-lg p-2"
          onChange={(e) => {
            onSelect(parseInt(e.target.value))
          }}
        >
          <option value="">Select a team</option>
          {selectData.map((data) => (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          ))}
        </select>
      </CardBody>
    </Card>
  )
}
