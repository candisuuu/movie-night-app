import { createSlice } from "@reduxjs/toolkit";

const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState: {
        debouncedSearchTerm: "",
        instantSearchTerm: "",
        searchResultsPage: 1
    },
    reducers: {
        setDebouncedSearchTerm(state, action) {
            state.debouncedSearchTerm = action.payload;
        },
        setInstantSearchTerm(state, action) {
            state.instantSearchTerm = action.payload;
        },
        setSearchResultsPage(state, action) {
            state.searchResultsPage = action.payload;
        }
    }
});

export const { setDebouncedSearchTerm, setInstantSearchTerm, setSearchResultsPage } = searchTermSlice.actions;
export const searchTermReducer = searchTermSlice.reducer;