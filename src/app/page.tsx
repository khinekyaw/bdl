import ClientPlayerList from "@/components/home/ClientPlayerList"
import PlayerListLoading from "@/components/home/PlayerListLoading"
import ServerPlayerList from "@/components/home/ServerPlayerList"

export default async function Home() {
  return (
    <div>
      {/* <PlayerListLoading /> */}
      <ServerPlayerList />
      {/* <ClientPlayerList /> */}
    </div>
  )
}
