import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const movieSearchApi = createApi({
    reducerPath: 'movies',
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
            fetchMovies: builder.query({
                query: (search) => {
                    return {
                        url: '/movie-search',
                        params: {
                            s: search.term,
                            page: search.page
                        },
                        method: 'GET'
                    };
                }
            })
        };
    }
});

export const { useFetchMoviesQuery } = movieSearchApi;
export { movieSearchApi };