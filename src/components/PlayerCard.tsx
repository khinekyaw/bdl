import React from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import Image from "next/image"

import { PlayerInterface } from "@/types"

export default function PlayerCard({
  id,
  first_name,
  last_name,
  position,
}: PlayerInterface) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Position - {position}</p>
        <small className="text-default-500">Id {id}</small>
        <h4 className="font-bold text-large">
          {first_name} {last_name}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="w-full aspect-video relative">
          <Image
            alt={first_name + last_name}
            className="object-cover rounded-xl w-full h-full"
            src="/images/nba-symbol.jpg"
            fill
            sizes="30vw"
          />
        </div>
      </CardBody>
    </Card>
  )
}
