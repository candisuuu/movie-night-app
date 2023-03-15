import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_AUTH0_USER_API,
        prepareHeaders: (headers, {getState}) => {
            const accessToken = getState().user.accessToken;
            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
                headers.set('content-type', 'application/json');
            }
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            patchUserUpvotedMovies: builder.mutation({
                query: (movie) => {
                    return {
                        url: movie.userId,
                        method: 'PATCH',
                        body: {
                            user_metadata: {
                                UpvotedMovies: movie.upvotedMovies
                            }
                        }
                    };
                }
            })
        };
    }
});

export const { usePatchUserUpvotedMoviesMutation } = usersApi;
export { usersApi };