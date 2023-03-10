import DOMPurify from 'dompurify';
import VoteButton from './VoteButton';
import { FaExternalLinkAlt } from 'react-icons/fa';

function MovieCard({ movie }) {
    const cleanString = (string) => {
        return DOMPurify.sanitize(string);
    };
    const cleanMovieTitle = cleanString(movie.Title);
    const cleanMovieLink = cleanString(movie.movieLink);
    const minifyMovieTitle = cleanMovieTitle.length > 30 ? cleanMovieTitle.slice(0, 30) + "..." : cleanMovieTitle;

    return (
        <div className="m-2 w-80 lg:w-1/6 border border-slate-300 rounded">
            <div className="relative w-full h-poster">
                <div className={`${(movie.Poster === "N/A" || !movie.Poster) ? 'flex' : 'hidden'} absolute inset-0 w-full h-poster justify-center items-center rounded-t bg-slate-400`}>
                    <h3 className="text-lg font-medium text-white">No Poster Available</h3>
                </div>
                <img alt={movie.Title} className="w-full h-poster object-cover rounded-t" src={movie.Poster} />
            </div>
            <div className="h-movie-info p-2 flex flex-col gap-y-1 justify-around">
                <div className="font-medium text-center">{minifyMovieTitle}</div>
                <a className="font-medium text-blue-400" href={cleanMovieLink ? cleanMovieLink : `https://www.imdb.com/title/${movie.imdbID}/`} target="_blank" rel="noreferrer">
                    <FaExternalLinkAlt className="inline-block" /> Movie Info
                </a>
                <VoteButton movie={movie} />
            </div>
        </div>
    );
};

export default MovieCard;