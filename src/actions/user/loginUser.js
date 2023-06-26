import axios from "axios";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const loginUserRequest = () => ({
	type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (user) => ({
	type: LOGIN_USER_SUCCESS,
	payload: user,
});

export const loginUserFailure = (error) => ({
	type: LOGIN_USER_FAILURE,
	payload: error,
});

export const loginUser = (userData) => {
	return (dispatch) => {
		dispatch(loginUserRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/users/login`, userData)
			.then((response) => {
				const user = response.data;
				dispatch(loginUserSuccess(user));

				return Promise.resolve(user);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(loginUserFailure(errorMsg));

				return Promise.reject(error);
			});
	};
};
