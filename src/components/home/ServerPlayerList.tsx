import React from "react"

import PlayerCard from "@/components/PlayerCard"
import { PlayerApiDataInterface } from "@/types"
import ClientPlayerList from "./ClientPlayerList"

const ServerPlayerList = async () => {
  const res = await fetch(
    `${process.env["NEXT_PUBLIC_API_URL"]}/players?page=1&per_page=10`
  )
  const api_data = await res.json()
  const { data: players } = api_data as PlayerApiDataInterface

  return <ClientPlayerList initialData={players} nextPage={2} />
}

export default ServerPlayerList
