import { TeamInterface } from "@/types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import store from "store2"

import { getLargestId } from "@/utils"

export interface teamState {
  teams: TeamInterface[]
}

const initialState: teamState = {
  teams: [
    // {
    //   id: 1,
    //   name: "Ball Balla",
    //   country: "Myanmar",
    //   region: "Yangon",
    //   player_count: 1,
    // },
    // {
    //   id: 2,
    //   name: "YGN Go",
    //   country: "Myanmar",
    //   region: "Yangon",
    //   player_count: 1,
    // },
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
    addTeam: (state, action: PayloadAction<TeamInterface>) => {
      const team = action.payload
      state.teams = [
        { ...team, id: getLargestId(state.teams) + 1, player_count: 0 },
        ...state.teams,
      ]
      store("teams", state.teams)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTeams, addTeam } = teamSlice.actions

export default teamSlice.reducer
