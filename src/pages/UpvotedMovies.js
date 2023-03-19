import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setSortOrder, useFetchAllUpvotedMoviesQuery } from '../store';
import MovieList from '../components/MovieList';

function UpvotedMovies({ isLoggedIn }) {
    const dispatch = useDispatch();
    const { sortBy, sortOrder } = useSelector(({ upvotedMovieSort }) => {
        return {
            sortBy: upvotedMovieSort.sortBy,
            sortOrder: upvotedMovieSort.sortOrder
        };
    });
    
    const { data, error, isFetching } = useFetchAllUpvotedMoviesQuery({ sortBy: sortBy, sortOrder: sortOrder });

    const handleSetSorting = (e) => {
        const params = e.target.value.match(/([^|][A-Za-z]*)/gm);
        dispatch(setSortBy(params[0]));
        dispatch(setSortOrder(params[1]));
    };
    
    let header,
        content;

    if (isFetching) {
        header = <h3 className="py-4 text-center font-medium dark:text-white">Loading...</h3>
    } else if (error)
        header = <h3 className="py-4 text-center font-medium dark:text-white">Error retrieving movies.</h3>
    else {
        header = <div className="flex items-center justify-between">
                        <select className="rounded dark:bg-slate-800 dark:text-white" onChange={handleSetSorting} defaultValue={`${sortBy}||${sortOrder}`}>
                            <option value="Title||ASC">Title A - Z</option>
                            <option value="Title||DESC">Title Z - A</option>
                            <option value="totalVotes||DESC">Highest Votes</option>
                            <option value="totalVotes||ASC">Lowest Votes</option>
                        </select>
                    </div>
        content = <MovieList movies={data} />
    }

    return (
        <div className={isLoggedIn ? "" : "hidden"}>
            <div className="container mx-auto mt-20 sm:mt-16 p-4 divide-y">
                {header}
                {content}
            </div>
        </div>
    );
};

export default UpvotedMovies;