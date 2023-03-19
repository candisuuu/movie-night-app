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
                providesTags: ['UpvotedMovies'],
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
                invalidatesTags: ['UpvotedMovies'],
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
            }),
            removeUpvotedMovie: builder.mutation({
                invalidatesTags: ['UpvotedMovies'],
                query: (movie) => {
                    return {
                        url: `/movies?id=${movie.imdbID}`,
                        method: 'DELETE'
                    };
                }
            })
        };
    }
});

export const { useFetchAllUpvotedMoviesQuery, useUpvoteMovieMutation, useRemoveUpvotedMovieMutation } = upvotedMoviesApi;
export { upvotedMoviesApi };