import axios from "axios";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const registerUserRequest = () => ({
	type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (user) => ({
	type: REGISTER_USER_SUCCESS,
	payload: user,
});

export const registerUserFailure = (error) => ({
	type: REGISTER_USER_FAILURE,
	payload: error,
});

export const registerUser = (username, password) => {
	return (dispatch) => {
		dispatch(registerUserRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/users/`, {
				username,
				password,
			})
			.then((response) => {
				const user = response.data;
				dispatch(registerUserSuccess(user));
				return Promise.resolve(user);
			})
			.catch((error) => {
				const errorMsg = error.response.data;
				dispatch(registerUserFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
