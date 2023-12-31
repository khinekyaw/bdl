import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
// import store from "store2"

export interface authState {
  username: string | null
}

const initialState: authState = {
  username: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      // store("username", state.username)
      Cookies.set("username", state.username)
    },
    logout: (state) => {
      state.username = null
      // store.remove("username")
      Cookies.remove("username")
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer
