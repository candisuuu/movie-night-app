import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useFetchUserQuery, setUserData } from './store';
import Header from './components/Header';
import Route from './components/Route';
import MovieSearch from './pages/MovieSearch';
import UpvotedMovies from './pages/UpvotedMovies';

function App() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => {
    return user.userName;
  });
  const { data } = useFetchUserQuery({ userName: userId }, { skip: (isAuthenticated && userId.length > 0) ? false : true });
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginOptions(true);
      dispatch(setUserData({ userName: user.nickname, userUpvotedMovies: null }));

      if (data)
        dispatch(setUserData({ userName: user.nickname, userUpvotedMovies: data.UpvotedMovies }));
    }
    // eslint-disable-next-line
  }, [isAuthenticated, data]);

  return (
    <div className="w-full divide-y">
        <Header isLoggedIn={showLoginOptions} />
        <Route path="/">
            <MovieSearch isLoggedIn={showLoginOptions} />
        </Route>
        <Route path="/upvote">
            <UpvotedMovies isLoggedIn={showLoginOptions} />
        </Route>
    </div>
  );
}

export default App;