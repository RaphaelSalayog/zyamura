import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUsernameExist: false,
  isChangeCredentials: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setIsUsernameExist: (state, { payload }) => {
      state.isUsernameExist = payload;
    },
    setIsChangeCredentials: (state, { payload }) => {
      state.isChangeCredentials = payload;
    },
  },
});

export const { setIsUsernameExist, setIsChangeCredentials } =
  accountSlice.actions;
export default accountSlice.reducer;
