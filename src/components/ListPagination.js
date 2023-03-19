import { useDispatch, useSelector } from 'react-redux';
import { setSearchResultsPage } from '../store';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ListPagination({ totalPages }) {
    const dispatch = useDispatch();
    const searchResultsPage = useSelector(({ searchTerm }) => {
        return searchTerm.searchResultsPage;
    });

    const handlePrevPage = () => {
        window.scrollTo(0,0);
        dispatch(setSearchResultsPage(searchResultsPage - 1));
    };

    const handleNextPage = () => {
        window.scrollTo(0,0);
        dispatch(setSearchResultsPage(searchResultsPage + 1));
    };

    const handlePageNumber = (e) => {
        window.scrollTo(0,0);
        dispatch(setSearchResultsPage(parseInt(e.target.value)));
    };

    if (totalPages > 1) {
        let pageNumbers = [];
        for (var i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex items-center justify-around mb-4 pt-4 dark:text-white">
                <button className={`${searchResultsPage === 1 ? 'invisible pointer-events-none ' : ''}flex items-center p-2 border border-black dark:border-slate-500 rounded dark:bg-slate-800`} onClick={handlePrevPage}><FaChevronLeft className="inline-block mr-1" /> Prev</button>
                <div>
                    <span>Go to </span>
                    <select className="rounded ml-1 dark:bg-slate-800" onChange={handlePageNumber} value={searchResultsPage}>
                        {
                            pageNumbers.map((pageNumber) => {
                                return <option key={pageNumber} value={pageNumber}>Page {pageNumber}</option>;
                            })
                        }
                    </select>
                </div>
                <button className={`${searchResultsPage === totalPages ? 'invisible pointer-events-none ' : ''}flex items-center p-2 border border-black dark:border-slate-500 rounded dark:bg-slate-800`} onClick={handleNextPage}>Next <FaChevronRight className="inline-block ml-1" /></button>
            </div>
        );
    }
}

export default ListPagination;