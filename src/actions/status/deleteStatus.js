import axios from "axios";

export const DELETE_STATUS_REQUEST = "DELETE_STATUS_REQUEST";
export const DELETE_STATUS_SUCCESS = "DELETE_STATUS_SUCCESS";
export const DELETE_STATUS_FAILURE = "DELETE_STATUS_FAILURE";

export const deleteStatusRequest = () => ({
	type: DELETE_STATUS_REQUEST,
});

export const deleteStatusSuccess = (statusId) => ({
	type: DELETE_STATUS_SUCCESS,
	payload: statusId,
});

export const deleteStatusFailure = (error) => ({
	type: DELETE_STATUS_FAILURE,
	payload: error,
});

export const deleteStatus = (statusId) => {
	return (dispatch) => {
		dispatch(deleteStatusRequest());
		return axios
			.delete(`${process.env.REACT_APP_API_URL}/status/${statusId}`)
			.then((response) => {
				const deletedStatus = response.data;
				dispatch(deleteStatusSuccess(deletedStatus));
				return Promise.resolve(deletedStatus);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(deleteStatusFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
