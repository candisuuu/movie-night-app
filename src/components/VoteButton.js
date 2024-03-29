import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpvoteMovieMutation, usePatchUserUpvotedMoviesMutation, setUserUpvotedMovie, setUserDownvotedMovie, useRemoveUpvotedMovieMutation } from '../store';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function VoteButton({ movie })  {
    const dispatch = useDispatch();
    const userData = useSelector(({user}) => {
        return { ...user };
    });
    const [movieVotes, setMovieVotes] = useState(movie.totalVotes || 0);
    const [userVote, setUserVote] = useState(userData.userDidUpvote || false);
    const [setUpvoteMovie, setUpvoteMovieResults] = useUpvoteMovieMutation();
    const [setUserUpvotedMovies, setUserUpvotedMoviesResults] = usePatchUserUpvotedMoviesMutation();
    // eslint-disable-next-line
    const [setRemoveUpvotedMovie, setRemoveUpvotedMovieResults] = useRemoveUpvotedMovieMutation();

    const checkUserUpvotedMovies = (movieId) => {
        if (userData.userUpvotedMovies.indexOf(movieId) !== -1)
            return true;
        else
            return false;
    };

    useEffect(() => {
        if (userData.userUpvotedMovies) {
            setUserVote(checkUserUpvotedMovies(movie.imdbID));

            if (setUpvoteMovieResults.isSuccess)
                setUserUpvotedMovies({ userId: userData.userId, upvotedMovies: userData.userUpvotedMovies });
        }

        // eslint-disable-next-line
    }, [userData.userUpvotedMovies, setUpvoteMovieResults.isSuccess]);

    const handleUpvoteMovie = (didUpvote) => {
        const dataBody = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Poster: movie.Poster,
            movieLink: `https://www.imdb.com/title/${movie.imdbID}/`
        };
        let movieVoteTotal;

        if ((didUpvote === false) && (checkUserUpvotedMovies(movie.imdbID) === false)) {
            movieVoteTotal = movieVotes + 1;
            setUpvoteMovie({
                ...dataBody,
                totalVotes: movie.totalVotes ? movieVoteTotal : 1
            });

            setMovieVotes(movieVoteTotal);
            setUserVote(true);
            dispatch(setUserUpvotedMovie(movie.imdbID));
        } else {
            movieVoteTotal = movieVotes === 1 ? 0 : (movieVotes - 1);
            setMovieVotes(movieVoteTotal);
            setUserVote(false);
            dispatch(setUserDownvotedMovie(movie.imdbID));

            if (movieVoteTotal === 0)
                setRemoveUpvotedMovie({ ...dataBody });
            else {
                setUpvoteMovie({
                    ...dataBody,
                    totalVotes: movie.totalVotes ? movieVoteTotal : 0
                });
            }
        }
    };

    return (
        <div className="flex justify-between border border-slate-400 dark:border-slate-900 rounded font-medium">
            <button className={`${(setUpvoteMovieResults.isLoading || setUserUpvotedMoviesResults.isLoading) ? 'pointer-events-none': ''} ${userVote ? 'bg-red-500' : 'bg-green-400'} text-white p-3 w-3/4 rounded-l`} onClick={() => handleUpvoteMovie(userVote)}>
                {userVote ? <FaThumbsDown className="inline-block" /> : <FaThumbsUp className="inline-block" />} {userVote ? 'Undo Upvote?' : 'Let\'s Watch It!'}
            </button>
            <span className="flex items-center p-3">{movieVotes}</span>
        </div>
    );
};

export default VoteButton;