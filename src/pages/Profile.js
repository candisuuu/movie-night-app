import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchAllUpvotedMoviesQuery, setUserAppTheme, usePatchUserAppThemeMutation } from '../store';
import MovieList from '../components/MovieList';

function Profile({ isLoggedIn }) {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('');
    const { data, error, isFetching, isSuccess } = useFetchAllUpvotedMoviesQuery({ sortBy: "Title", sortOrder: "ASC" });
    // eslint-disable-next-line
    const [patchUserAppTheme, patchUserAppThemeResults] = usePatchUserAppThemeMutation();
    const profilePageData = useSelector((state) => {
        return {
            allUpvotedMovies: [],
            userUpvotedMovies: state.user.userUpvotedMovies,
            filteredMovies: [],
            userId: state.user.userId,
            userTheme: state.user.userAppTheme
        };
    });

    const handleSetTheme = e => {
        e.preventDefault();

        const newTheme = profilePageData.userTheme === "Light Mode" ? "Dark Mode" : "Light Mode";
        dispatch(setUserAppTheme(newTheme));
        patchUserAppTheme({ userId: profilePageData.userId, preference: (newTheme === "Light Mode" ? "default" : "dark") });
        document.documentElement.classList.toggle("dark");
    };

    const handleSetUserEmail = e => {
        setUserEmail(e.target.value);
    };

    const handleSendPasswordResetRequest = async e => {
        e.preventDefault();

        const requestSettings = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                email: userEmail,
                connection: 'Username-Password-Authentication'
            })
        };

        try {
            const response = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/change_password`, requestSettings);
            if (response.ok)
                return;
            else
                console.log('error');
        } catch(err) {
            console.error(err);
        }
    };

    let header,
        content;

    if (isFetching)
        <h3 className="border-b py-4 text-center font-medium dark:text-white">Loading data...</h3>
    else if (error)
        header = <h3 className="border-b py-4 text-center font-medium dark:text-white">Error retrieving data</h3>
    else if (data && isSuccess) {
        profilePageData.allUpvotedMovies = profilePageData.allUpvotedMovies.concat(data);
            let filteredMovieData;

        
        for (let i = 0; i < profilePageData.userUpvotedMovies.length; i++) {
            filteredMovieData = profilePageData.allUpvotedMovies.filter(movie => movie.imdbID === profilePageData.userUpvotedMovies[i]);

            if (filteredMovieData.length)
                profilePageData.filteredMovies = profilePageData.filteredMovies.concat(filteredMovieData[0]);
        }

        header = <h3 className="border-b py-4 text-center font-medium dark:text-white">{profilePageData.filteredMovies.length ? 'Your upvoted movies' : 'You have not upvoted any movies'}</h3>
        content = profilePageData.filteredMovies.length ? <MovieList movies={profilePageData.filteredMovies} /> : '';
    }

    return (
        <div className={isLoggedIn ? "" : "hidden"}>
            <div className="container mx-auto mt-20 sm:mt-16 p-4">
                <div className="pb-4 border-b dark:text-white">
                    <div className="flex items-center mb-5">
                        Current App Theme: <span className="ml-1 font-medium">{profilePageData.userTheme}</span>
                        <button className="ml-4 p-2 border rounded border-black dark:border-slate-500 dark:bg-slate-800" onClick={handleSetTheme}>Toggle App Theme</button>
                    </div>
                    <div className="flex items-end">
                        <div className="w-1/3">
                            <label className="block font-medium" htmlFor="emailInput">Reset Password</label>
                            <input className="w-full rounded border-slate-300 dark:border-slate-500 form-input dark:bg-slate-800" id="emailInput" type="text" value={userEmail} onChange={handleSetUserEmail} placeholder="Type in your email address" />
                        </div>
                        <button className="ml-4 p-2 border rounded border-black dark:border-slate-500 dark:bg-slate-800" onClick={handleSendPasswordResetRequest}>Send password reset email</button>
                    </div>
                </div>
                {header}
                {content}
            </div>
        </div>
    );
};

export default Profile;