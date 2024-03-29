import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { setUserData, setAccessToken } from './store';
import Header from './components/Header';
import Route from './components/Route';
import MovieSearch from './pages/MovieSearch';
import UpvotedMovies from './pages/UpvotedMovies';
import Profile from './pages/Profile';

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const getUserAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      dispatch(setAccessToken(accessToken));
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserAccessToken();

      setShowLoginOptions(true);
      dispatch(setUserData({
                  userId: user.sub,
                  userName: user.nickname,
                  userUpvotedMovies: user[process.env.REACT_APP_AUTH0_USER_METADATA_NAMESPACE].UpvotedMovies,
                  userAppTheme: user[process.env.REACT_APP_AUTH0_USER_METADATA_NAMESPACE].themePreference
              }));
      
      if (user[process.env.REACT_APP_AUTH0_USER_METADATA_NAMESPACE].themePreference === "dark")
        document.documentElement.classList.add("dark");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="w-full divide-y">
        <Header isLoggedIn={showLoginOptions} />
        <Route path="/">
            <MovieSearch isLoggedIn={showLoginOptions} />
        </Route>
        <Route path="/upvote">
            <UpvotedMovies isLoggedIn={showLoginOptions} />
        </Route>
        <Route path="/profile">
            <Profile isLoggedIn={showLoginOptions} />
        </Route>
    </div>
  );
}

export default App;