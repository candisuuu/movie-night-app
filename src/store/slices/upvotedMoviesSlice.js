import { createSlice } from "@reduxjs/toolkit";

const upvotedMoviesSlice = createSlice({
    name: "upvotedMovieSort",
    initialState: {
        sortBy: 'Title',
        sortOrder: 'ASC'
    },
    reducers: {
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        setSortOrder(state,action) {
            state.sortOrder = action.payload;
        }
    }
});

export const { setSortBy, setSortOrder } = upvotedMoviesSlice.actions;
export const upvotedMoviesReducer = upvotedMoviesSlice.reducer;