import ClientPlayerList from "@/components/home/ClientPlayerList"
import PlayerListLoading from "@/components/home/PlayerListLoading"
import ServerPlayerList from "@/components/home/ServerPlayerList"

export default async function Home() {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">Players</h1>
      {/* <PlayerListLoading /> */}
      {/* <ServerPlayerList /> */}
      <ClientPlayerList />
    </div>
  )
}
