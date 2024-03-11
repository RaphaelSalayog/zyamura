import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUsernameExist: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setIsUsernameExist: (state, { payload }) => {
      state.isUsernameExist = payload;
    },
  },
});

export const { setIsUsernameExist } = accountSlice.actions;
export default accountSlice.reducer;
