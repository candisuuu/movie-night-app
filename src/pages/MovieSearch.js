import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, useFetchMoviesQuery } from '../store';
import MovieSearchForm from '../components/MovieSearchForm';
import MovieList from '../components/MovieList';
import ListPagination from '../components/ListPagination';
import Modal from '../components/Modal';

function MovieSearch({ isLoggedIn }) {
    const dispatch = useDispatch();
    const { searchTerm, searchResultsPage } = useSelector(({ searchTerm }) => {
        return {
            searchTerm: searchTerm.debouncedSearchTerm,
            searchResultsPage: searchTerm.searchResultsPage
        };
    });
    const { data, error, isFetching, isSuccess } = useFetchMoviesQuery({ term: searchTerm, page: searchResultsPage }, { skip: searchTerm.length > 0 ? false : true });

    const handleOpenModal = () => {
        dispatch(toggleModal(true));
    };

    let header,
        content,
        pagination,
        modalOpenButton;

    if (isFetching) {
        header = <h3 className="border-y-0 py-4 text-center font-medium dark:text-white">Loading...</h3>
    } else if (error)
        header = <h3 className="border-y-0 py-4 text-center font-medium dark:text-white">Error retrieving movies.</h3>
    else if (isSuccess && data.Response === "True") {
        header = <h3 className="border-y-0 py-4 text-center font-medium dark:text-white">Found {data.totalResults} Result{data.totalResults === 1 ? '' : 's'}</h3>
        content = <MovieList className="border-y" movies={data.Search} />
        pagination = data.totalResults > 10 ? <ListPagination totalPages={Math.floor(data.totalResults / 10) + 1} /> : '';
        modalOpenButton = <button type="button" className="border border-black dark:border-slate-500 rounded dark:bg-slate-800 w-full py-3 dark:text-white" onClick={handleOpenModal}>
                            <strong>Can't find what you're looking for? Click this button to submit a movie recommendation!</strong>
                        </button>;
    } else if (isSuccess) {
        header = <h3 className="py-4 text-center font-medium">No results</h3>
        modalOpenButton = <button type="button" className="border border-black dark:border-slate-500 rounded dark:bg-slate-800 w-full mb-2 py-3 dark:text-white" onClick={handleOpenModal}>
                            <strong>Click this button to submit a movie recommendation!</strong>
                        </button>;
    }

    return (
        <div className={isLoggedIn ? "" : "hidden"}>
            <div className="container mx-auto mt-20 sm:mt-16 p-4">
                <MovieSearchForm />
                {header}
                {content}
                {pagination}
                {modalOpenButton}
            </div>
            <Modal />
        </div>
    );
};

export default MovieSearch;