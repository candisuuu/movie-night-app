import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: "",
        userUpvotedMovies: null
    },
    reducers: {
      setUserData(state, action) {
          state.userName = action.payload.userName;
          state.userUpvotedMovies = action.payload.userUpvotedMovies;
      },
      setUserUpvotedMovie(state, action) {
        state.userUpvotedMovies.push(action.payload);
      }
    }
});

export const { setUserData, setUserUpvotedMovie } = userSlice.actions;
export const userReducer = userSlice.reducer;