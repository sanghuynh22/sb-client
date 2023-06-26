import axios from "axios";

export const GET_ALL_STATUS_REQUEST = "GET_ALL_STATUS_REQUEST";
export const GET_ALL_STATUS_SUCCESS = "GET_ALL_STATUS_SUCCESS";
export const GET_ALL_STATUS_FAILURE = "GET_ALL_STATUS_FAILURE";

export const getAllStatusRequest = () => ({
	type: GET_ALL_STATUS_REQUEST,
});

export const getAllStatusSuccess = (status) => ({
	type: GET_ALL_STATUS_SUCCESS,
	payload: status,
});

export const getAllStatusFailure = (error) => ({
	type: GET_ALL_STATUS_FAILURE,
	payload: error,
});

export const getAllStatus = () => {
	return (dispatch) => {
		dispatch(getAllStatusRequest());
		return axios
			.get(`${process.env.REACT_APP_API_URL}/status`)
			.then((response) => {
				const statuses = response.data;
				dispatch(getAllStatusSuccess(statuses));
				return Promise.resolve(statuses);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(getAllStatusFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
