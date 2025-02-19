import { useEffect, useState, useContext } from "react";
import { MyIdRequestContext } from "../../Pages/Returns/ReturnsList";
import axios from 'axios';
const ReviewForm = () => {
    const getidRequest = useContext(MyIdRequestContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [inputError, setInputError] = useState({});
    const [review, setReview] = useState({
        rating: "",
        comment: "",
        idRequest: "",
    });

    useEffect(() => {
        setReview({ ...review, idRequest: getidRequest });
    }, [getidRequest]);

    const submitReview = async (e) => {
        e.preventDefault();
        const data = {
            rating: Number(review.rating),
            comment: review.comment,
            idRequest: review.idRequest,
        }
        try {
            const response = await axios.post(`http://localhost:8000/api/comment`,
                data,
                { withCredentials: true }
            );
            alert(response.data.message);
            setInputError({});
            setButtonDisabled(true);
        } catch (error) {
            console.log(error);
            setInputError(error.response.data.errors);
            console.log(error.response.data.errors);
        }
    }

    const handleChange = async (e) => {
        e.preventDefault();
        setReview({ ...review, [e.target.name]: e.target.value });
    }
    return (
        <>
            {review.idRequest &&
                <form onSubmit={submitReview}>
                    <span className="text-danger">{inputError.message}</span>

                    <input type="number" max="5" min="0" placeholder="Rating"
                        className="form-control mt-1" name="rating"
                        value={review.rating ? review.rating : 0}
                        onChange={handleChange} />
                    <span className="text-danger">{inputError.rating}</span>

                    <textarea placeholder="Comment" className="form-control mt-1"
                        name="comment" value={review.comment}
                        onChange={handleChange} />
                    <span className="text-danger">{inputError.comment}</span>
                    
                    <input type="hidden" className="form-control mt-1"
                        value={review.idRequest} name="idRequest"
                        onChange={handleChange} />

                    <button type="submit" className="btn btn-primary mt-1 float-end"
                        disabled={buttonDisabled === false ? false : true}>Save review</button>
                </form>
            }

        </>
    );
}

export default ReviewForm;