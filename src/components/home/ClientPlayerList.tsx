"use client"
import React, { useCallback, useState } from "react"
import InfiniteScroll from "react-infinite-scroller"
import axios from "axios"

import PlayerCard from "@/components/PlayerCard"
import PlayerListLoading from "./PlayerListLoading"
import { PlayerApiDataInterface, PlayerInterface } from "@/types"

const ClientPlayerList = ({
  initialData = [],
  nextPage = 1,
}: {
  initialData?: PlayerInterface[]
  nextPage?: number
}) => {
  const [players, setPlayers] = useState<PlayerInterface[]>(initialData)
  const [fetching, setFetching] = useState(false)
  const [nextPageUrl, setNextPageUrl] = useState(
    `${process.env["NEXT_PUBLIC_API_URL"]}/players?page=${nextPage}&per_page=10`
  )

  const fetchItems = useCallback(async () => {
    if (fetching) {
      return
    }

    setFetching(true)

    try {
      const { data } = await axios.get<PlayerApiDataInterface>(nextPageUrl)

      setPlayers([...players, ...data.data])

      if (data.meta.next_page) {
        setNextPageUrl(
          `${process.env["NEXT_PUBLIC_API_URL"]}/players?page=${data.meta.next_page}&per_page=10`
        )
      } else {
        setNextPageUrl("")
      }
    } finally {
      setFetching(false)
    }
  }, [players, fetching, nextPageUrl])

  return (
    <InfiniteScroll
      className="grid grid-cols-3 gap-3"
      pageStart={0}
      loadMore={fetchItems}
      hasMore={true || false}
      loader={<PlayerListLoading key={0} count={3} />}
    >
      {players.map((player, idx) => (
        <PlayerCard key={player.id} {...player} />
      ))}
    </InfiniteScroll>
  )
}

export default ClientPlayerList
