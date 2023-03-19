import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: "",
        userName: "",
        userUpvotedMovies: null,
        userAppTheme: "Light Mode",
        accessToken: ""
    },
    reducers: {
      setUserData(state, action) {
          state.userId = action.payload.userId;
          state.userName = action.payload.userName;
          state.userUpvotedMovies = action.payload.userUpvotedMovies;
          state.userAppTheme = (action.payload.userAppTheme === "dark" ? "Dark" : "Light") + " Mode";
      },
      setUserUpvotedMovie(state, action) {
        if (state.userUpvotedMovies.indexOf(action.payload) === -1)
          state.userUpvotedMovies.push(action.payload);
      },
      setUserDownvotedMovie(state, action) {
        if (state.userUpvotedMovies.indexOf(action.payload) !== -1) {
          const movieIdIndex = state.userUpvotedMovies.indexOf(action.payload);

          state.userUpvotedMovies.splice(movieIdIndex, 1);
        }
      },
      setUserAppTheme(state, action) {
        state.userAppTheme = action.payload;
      },
      setAccessToken(state, action) {
        state.accessToken = action.payload;
      }
    }
});

export const { setUserData, setUserUpvotedMovie, setUserDownvotedMovie, setUserAppTheme, setAccessToken } = userSlice.actions;
export const userReducer = userSlice.reducer;