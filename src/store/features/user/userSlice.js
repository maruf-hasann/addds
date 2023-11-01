import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    updateLoggedInUser: (state, action) => {
      state.userData.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, updateLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
