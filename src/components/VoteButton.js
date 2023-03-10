import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpvoteMovieMutation, setUserUpvotedMovie } from '../store';
import { FaThumbsUp } from 'react-icons/fa';

function VoteButton({ movie })  {
    const dispatch = useDispatch();
    const userData = useSelector(({user}) => {
        return { ...user };
    });
    const [movieVotes, setMovieVotes] = useState(movie.totalVotes || 0);
    const [userVote, setUserVote] = useState(userData.userDidUpvote || false);
    const [upvoteMovie, upvoteMovieResults] = useUpvoteMovieMutation();

    useEffect(() => {
        if (userData.userUpvotedMovies) {
            const check = userData.userUpvotedMovies.filter(movieId => movieId === movie.imdbID);

            if (check.length)
                setUserVote(true);
        }
        // eslint-disable-next-line
    }, [userData.userUpvotedMovies]);

    const handleUpvoteMovie = () => {
        upvoteMovie({
            imdbID: movie.imdbID,
            Title: movie.Title,
            Poster: movie.Poster,
            movieLink: `https://www.imdb.com/title/${movie.imdbID}/`,
            totalVotes: movie.totalVotes ? (movie.totalVotes + 1) : 1,
            user: userData.userName
        });
    };

    useEffect(() => {
        if (upvoteMovieResults.isSuccess) {
            setMovieVotes(movieVotes + 1);
            setUserVote(true);

            dispatch(setUserUpvotedMovie(movie.imdbID));
        }
        // eslint-disable-next-line
    }, [upvoteMovieResults.isSuccess]);

    return (
        <div className="flex justify-between border border-slate-400 rounded font-medium">
            <button className={`${userVote ? 'bg-slate-200 pointer-events-none' : 'bg-green-400 text-white'} p-3 w-3/4 rounded-l`} onClick={handleUpvoteMovie}>
                <FaThumbsUp className="inline-block" /> {userVote ? 'You\'ve Upvoted!' : 'Let\'s Watch It!'}
            </button>
            <span className="flex items-center p-3">{movieVotes}</span>
        </div>
    );
};

export default VoteButton;