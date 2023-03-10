import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE
    }),
    endpoints(builder) {
        return {
            fetchUser: builder.query({
                query: (user) => {
                    return {
                        url: `/users/${user.userName}`,
                        method: 'GET'
                    };
                }
            })
        };
    }
});

export const { useFetchUserQuery } = usersApi;
export { usersApi };