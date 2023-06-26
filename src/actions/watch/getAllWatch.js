import axios from "axios";

export const GET_ALL_WATCH_REQUEST = "GET_ALL_WATCH_REQUEST";
export const GET_ALL_WATCH_SUCCESS = "GET_ALL_WATCH_SUCCESS";
export const GET_ALL_WATCH_FAILURE = "GET_ALL_WATCH_FAILURE";

export const getAllWatchRequest = () => ({
	type: GET_ALL_WATCH_REQUEST,
});

export const getAllWatchSuccess = (watches) => ({
	type: GET_ALL_WATCH_SUCCESS,
	payload: watches,
});

export const getAllWatchFailure = (error) => ({
	type: GET_ALL_WATCH_FAILURE,
	payload: error,
});

export const getAllWatch = () => {
	return (dispatch) => {
		dispatch(getAllWatchRequest());
		return axios
			.get("http://localhost:3000/api/watch")
			.then((response) => {
				const watches = response.data;
				dispatch(getAllWatchSuccess(watches));
				return Promise.resolve(watches);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(getAllWatchFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
