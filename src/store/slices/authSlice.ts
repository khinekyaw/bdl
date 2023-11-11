import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import store from "store2"

export interface authState {
  username: string | null
}

const initialState: authState = {
  username: null,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      store("username", state.username)
    },
    logout: (state) => {
      state.username = null
      store.remove("username")
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions

export default counterSlice.reducer
