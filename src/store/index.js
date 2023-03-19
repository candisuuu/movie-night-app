import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "./apis/usersApi";
import { movieSearchApi } from "./apis/movieSearchApi";
import { upvotedMoviesApi } from "./apis/upvotedMoviesApi";
import { userReducer, setUserData, setUserUpvotedMovie, setUserDownvotedMovie, setUserAppTheme, setAccessToken } from "./slices/userSlice";
import { modalReducer, toggleModal } from "./slices/modalSlice";
import { searchTermReducer, setDebouncedSearchTerm, setInstantSearchTerm, setSearchResultsPage } from "./slices/searchTermSlice";
import { upvotedMoviesReducer, setSortBy, setSortOrder } from "./slices/upvotedMoviesSlice";


const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [movieSearchApi.reducerPath]: movieSearchApi.reducer,
    [upvotedMoviesApi.reducerPath]: upvotedMoviesApi.reducer,
    user: userReducer,
    modal: modalReducer,
    searchTerm: searchTermReducer,
    upvotedMovieSort: upvotedMoviesReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
              .concat(usersApi.middleware)
              .concat(movieSearchApi.middleware)
              .concat(upvotedMoviesApi.middleware);
  }
});

setupListeners(store.dispatch);

export { store, setUserData, setUserUpvotedMovie, setUserDownvotedMovie, setUserAppTheme, setAccessToken, toggleModal, setDebouncedSearchTerm, setInstantSearchTerm, setSearchResultsPage, setSortBy, setSortOrder };
export { usePatchUserUpvotedMoviesMutation, usePatchUserAppThemeMutation } from './apis/usersApi';
export { useFetchMoviesQuery } from './apis/movieSearchApi';
export { useFetchAllUpvotedMoviesQuery, useUpvoteMovieMutation, useRemoveUpvotedMovieMutation } from './apis/upvotedMoviesApi';