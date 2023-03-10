import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, setUserUpvotedMovie, useUpvoteMovieMutation } from '../store';
import { nanoid } from 'nanoid';
import { FaTimes } from 'react-icons/fa';

function Modal() {
    const dispatch = useDispatch();
    const modalData = useSelector((state) => {
        return {
            userId: state.user.userName,
            modalVisibility: state.modal
        };
    });
    const [upvoteMovie] = useUpvoteMovieMutation();
    const titleInput = useRef(null);
    const infoInput = useRef(null);

    const handleCloseModal = (e) => {
        e.preventDefault();

        dispatch(toggleModal(false));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const movieId = nanoid();

        upvoteMovie({
            imdbID: movieId,
            Title: titleInput.current.value,
            Poster: "N/A",
            movieLink: infoInput.current.value,
            totalVotes: 1,
            user: modalData.userId
        });
        dispatch(setUserUpvotedMovie(movieId));

        setTimeout(function() {
            dispatch(toggleModal(false));
        }, 300);
    };

    return (
        <div className={`${modalData.modalVisibility ? "block" : "hidden"} fixed inset-0 bg-slate-700/90`}>
            <div className="absolute inset-0 sm:inset-x-1/3 sm:inset-y-1/4 min-w-fit h-screen sm:h-fit p-2.5 bg-white sm:rounded sm:shadow-lg">
                <button className="absolute right-3" onClick={handleCloseModal} aria-label="Close Modal">
                    <FaTimes />
                </button>
                <h2 className="font-medium border-b pb-2">Submit Your Movie Recommendation</h2>
                <div className="mt-2">
                    <form className="form" onSubmit={handleSubmitForm}>
                        <div className="mt-2 required field">
                            <label className="font-medium">Movie Title</label>
                            <input className="block w-full rounded border-slate-300 form-input" type="text" name="movie-title" placeholder="Enter movie title" ref={titleInput} />
                        </div>
                        <div className="mt-2 required field">
                            <label className="font-medium">Movie Info Link</label>
                            <input className="block w-full rounded border-slate-300 form-input" type="text" name="movie-info-link" placeholder="Enter link to movie information" ref={infoInput} />
                        </div>
                        <button className="block w-full rounded mt-4 py-2 bg-slate-900 text-white" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;