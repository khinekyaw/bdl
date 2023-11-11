"use client"
import React, { useCallback, useState } from "react"
import InfiniteScroll from "react-infinite-scroller"
import axios from "axios"

import PlayerCard from "@/components/PlayerCard"
import PlayerListLoading from "./PlayerListLoading"
import { PlayerApiDataInterface, PlayerInterface, TeamInterface } from "@/types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { flipPlayer } from "@/store/slices/teamSlice"

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
  const teams = useSelector((state: RootState) => state.team.teams)
  const teamsSelectData = teams.map((team) => ({
    label: team.name,
    value: team.id,
  }))
  const dispatch = useDispatch()

  const getTeam = (plr: PlayerInterface) => {
    let team = null
    team = teams.filter((team) => {
      return team.players.filter((player) => player.id === plr.id).length
    })
    if (team.length) {
      team = team[0]
    } else {
      team = null
    }
    return team
  }

  const onSelect = (player: PlayerInterface, teamId: number) => {
    dispatch(flipPlayer({ player, teamId }))
  }

  // console.log("tde:", teamsSelectData)
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
      className="grid grid-cols-3 gap-4"
      pageStart={0}
      loadMore={fetchItems}
      hasMore={true || false}
      loader={<PlayerListLoading key={0} count={3} />}
    >
      {players.map((player, idx) => (
        <PlayerCard
          key={player.id}
          {...player}
          selectData={teamsSelectData}
          currentTeam={getTeam(player)}
          onSelect={onSelect.bind(self, player)}
        />
      ))}
    </InfiniteScroll>
  )
}

export default ClientPlayerList
