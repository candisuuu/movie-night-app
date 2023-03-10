import MovieCard from './MovieCard';

function MovieList({ className, movies }) {
    return (
        <>
            <div className={`flex flex-wrap mt-4 py-4 justify-around sm:justify-start ${className}`}>
                {
                    movies.map(movie => {
                        return <MovieCard key={movie.imdbID} movie={movie} />
                    })
                }
            </div>
        </>
    );
};

export default MovieList;