export interface TeamInterface {
  id: number
  name: string
  player_count: number
  region: string
  country: string
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
  meta: {
    total_pages: number
    current_page: number
    next_page: number
    per_page: number
    total_count: number
  }
}
