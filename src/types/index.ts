export interface TeamInterface {
  id: number
}

export interface PlayerInterface {
  id: number
  first_name: string
  last_name: string
  height_feet: number
  height_inches: number
  team: TeamInterface
  position: string
}

export interface PlayerApiDataInterface {
  data: PlayerInterface[]
}
