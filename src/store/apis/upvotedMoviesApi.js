import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const upvotedMoviesApi = createApi({
    reducerPath: 'upvotedMovies',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE,
        prepareHeaders: (headers, {getState}) => {
            const accessToken = getState().user.accessToken;
            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            fetchAllUpvotedMovies: builder.query({
                query: (sort) => {
                    return {
                        url: '/movies',
                        params: {
                            sortBy: sort.sortBy,
                            sortOrder: sort.sortOrder
                        },
                        method: 'GET'
                    };
                }
            }),
            upvoteMovie: builder.mutation({
                query: (movie) => {
                    return {
                        url: '/movies',
                        method: 'POST',
                        body: {
                            imdbID: movie.imdbID,
                            Title: movie.Title,
                            Poster: movie.Poster,
                            movieLink: movie.movieLink,
                            totalVotes: movie.totalVotes
                        }
                    };
                }
            })
        };
    }
});

export const { useFetchAllUpvotedMoviesQuery, useUpvoteMovieMutation } = upvotedMoviesApi;
export { upvotedMoviesApi };