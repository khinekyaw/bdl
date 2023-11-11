import PlayerCard from "@/components/PlayerCard"
import { PlayerApiDataInterface } from "@/types"

export default async function Home() {
  const res = await fetch(
    `${process.env["NEXT_PUBLIC_API_URL"]}/players?page=0&per_page=10`
  )
  const api_data = await res.json()
  const { data: players } = api_data as PlayerApiDataInterface

  return (
    <div className="grid grid-cols-3 gap-3">
      {players.map((player, idx) => (
        <PlayerCard key={player.id} {...player} />
      ))}
    </div>
  )
}
