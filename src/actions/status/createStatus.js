import axios from "axios";

export const CREATE_STATUS_REQUEST = "CREATE_STATUS_REQUEST";
export const CREATE_STATUS_SUCCESS = "CREATE_STATUS_SUCCESS";
export const CREATE_STATUS_FAILURE = "CREATE_STATUS_FAILURE";

export const createStatusRequest = () => ({
	type: CREATE_STATUS_REQUEST,
});

export const createStatusSuccess = (status) => ({
	type: CREATE_STATUS_SUCCESS,
	payload: status,
});

export const createStatusFailure = (error) => ({
	type: CREATE_STATUS_FAILURE,
	payload: error,
});

export const createStatus = ({ text, image, user }) => {
	let data = { text, user };
	if (image) {
		data.image = image;
	}
	return (dispatch) => {
		dispatch(createStatusRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/status`, data)
			.then((response) => {
				const status = response.data;
				dispatch(createStatusSuccess(status));
				return Promise.resolve(status);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(createStatusFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
