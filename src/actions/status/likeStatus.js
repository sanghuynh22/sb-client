import axios from "axios";

export const LIKE_STATUS_REQUEST = "LIKE_STATUS_REQUEST";
export const LIKE_STATUS_SUCCESS = "LIKE_STATUS_SUCCESS";
export const LIKE_STATUS_FAILURE = "LIKE_STATUS_FAILURE";

export const likeStatusRequest = () => ({
	type: LIKE_STATUS_REQUEST,
});

export const likeStatusSuccess = (status) => ({
	type: LIKE_STATUS_SUCCESS,
	payload: status,
});

export const likeStatusFailure = (error) => ({
	type: LIKE_STATUS_FAILURE,
	payload: error,
});

export const likeStatus = (statusId, userId) => {
	return (dispatch) => {
		dispatch(likeStatusRequest());
		return axios
			.put(`${process.env.REACT_APP_API_URL}/status/like-status/${statusId}`, {
				userId,
			})
			.then((response) => {
				const updatedStatus = response.data;
				dispatch(likeStatusSuccess(updatedStatus));
				return Promise.resolve(updatedStatus);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(likeStatusFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
