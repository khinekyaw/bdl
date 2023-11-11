import { TeamInterface } from "@/types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import store from "store2"

export interface teamState {
  teams: TeamInterface[]
}

const initialState: teamState = {
  teams: [
    {
      id: 1,
      name: "Ball Balla",
      country: "Myanmar",
      region: "Yangon",
      player_count: 1,
    },
    {
      id: 2,
      name: "YGN Go",
      country: "Myanmar",
      region: "Yangon",
      player_count: 1,
    },
  ],
}

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<TeamInterface[]>) => {
      state.teams = action.payload
      store("teams", state.teams)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTeams } = teamSlice.actions

export default teamSlice.reducer
