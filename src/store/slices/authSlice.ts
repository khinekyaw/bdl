import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

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
    },
    logout: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions

export default counterSlice.reducer
