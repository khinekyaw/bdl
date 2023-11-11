import React from "react"
import { Card, CardBody } from "@nextui-org/card"
import Image from "next/image"

import { TeamInterface } from "@/types"

const TeamCard = ({ name, players, region, country }: TeamInterface) => {
  return (
    <Card className="p-1">
      <CardBody className="overflow-visible">
        <div className="flex gap-3">
          <div className="w-20 h-120 relative">
            <Image
              alt={name}
              className="object-cover rounded-xl w-full h-full"
              src="/images/nba-symbol.jpg"
              fill
              sizes="20vw"
            />
          </div>
          <div>
            <h1 className="font-bold text-2xl">{name}</h1>
            <p>
              {region}, {country}
            </p>
            <p>Total payers: {players.length}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default TeamCard
