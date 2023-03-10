import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const upvotedMoviesApi = createApi({
    reducerPath: 'upvotedMovies',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE
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
                            totalVotes: movie.totalVotes,
                            userName: movie.user
                        }
                    };
                }
            })
        };
    }
});

export const { useFetchAllUpvotedMoviesQuery, useUpvoteMovieMutation } = upvotedMoviesApi;
export { upvotedMoviesApi };