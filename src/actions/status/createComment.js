import axios from "axios";

export const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE";

export const createCommentRequest = () => ({
	type: CREATE_COMMENT_REQUEST,
});

export const createCommentSuccess = (comment) => ({
	type: CREATE_COMMENT_SUCCESS,
	payload: comment,
});

export const createCommentFailure = (error) => ({
	type: CREATE_COMMENT_FAILURE,
	payload: error,
});

export const createComment = (data) => {
	return (dispatch) => {
		dispatch(createCommentRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/comment/`, data)
			.then((response) => {
				const comment = response.data;
				dispatch(createCommentSuccess(comment));
				return Promise.resolve(comment);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(createCommentFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
