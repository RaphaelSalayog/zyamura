import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUsernameExist: false,
  isPassNotEqual: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setIsUsernameExist: (state, { payload }) => {
      state.isUsernameExist = payload;
    },
    setIsPassNotEqual: (state, { payload }) => {
      state.isPassNotEqual = payload;
    },
  },
});

export const { setIsUsernameExist, setIsPassNotEqual } = accountSlice.actions;
export default accountSlice.reducer;
