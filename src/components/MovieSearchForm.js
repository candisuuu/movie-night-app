import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDebouncedSearchTerm, setInstantSearchTerm, setSearchResultsPage } from '../store';
import { FaTimes } from 'react-icons/fa';

function MovieSearchForm() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(({ searchTerm }) => {
        return searchTerm.instantSearchTerm;
    });

    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(setDebouncedSearchTerm(searchTerm));
            dispatch(setSearchResultsPage(1));
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
        // eslint-disable-next-line
    }, [searchTerm]);

    const handleSetSearchTerm = (e) => {
        e.preventDefault();
        dispatch(setInstantSearchTerm(e.target.value));
    };

    const handleResetSearchTerm = () => {
        dispatch(setInstantSearchTerm(''));
        dispatch(setSearchResultsPage(1));
    };

    return(
        <div className="px-4">
            <label className="font-medium dark:text-white" htmlFor="movieSearch">Movie Search</label>
            <div className="relative">
                <input id="movieSearch"
                    className="w-full rounded border-slate-300 dark:border-slate-500 form-input dark:bg-slate-800 dark:text-white"
                    type="text"
                    value={searchTerm}
                    onChange={handleSetSearchTerm}
                    placeholder="Enter a movie title and press the enter key on your keyboard" />
                <button className={`${searchTerm.length > 0 ? "" : "hidden "}absolute top-3.5 right-3`} type="button" aria-label="Reset search" onClick={handleResetSearchTerm}>
                    <FaTimes className="dark:fill-white" />
                </button>
            </div>
        </div>
    )
}

export default MovieSearchForm;