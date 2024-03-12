import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUsernameExist: {
    isError: false,
    errorMessage: "",
  },
  isPassNotEqual: {
    isError: false,
    errorMessage: "",
  },
  isPassDoesNotMatch: {
    isError: false,
    errorMessage: "",
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setIsUsernameExist: (state, { payload }) => {
      state.isUsernameExist.isError = payload.isError;
      state.isUsernameExist.errorMessage = payload.errorMessage;
    },
    setIsPassNotEqual: (state, { payload }) => {
      state.isPassNotEqual.isError = payload.isError;
      state.isPassNotEqual.errorMessage = payload.errorMessage;
    },
    setIsPassDoesNotMatch: (state, { payload }) => {
      state.isPassDoesNotMatch.isError = payload.isError;
      state.isPassDoesNotMatch.errorMessage = payload.errorMessage;
    },
  },
});

export const { setIsUsernameExist, setIsPassNotEqual, setIsPassDoesNotMatch } =
  accountSlice.actions;
export default accountSlice.reducer;
