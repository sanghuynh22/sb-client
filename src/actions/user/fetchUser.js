import axios from "axios";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = () => ({
	type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
	type: FETCH_USER_SUCCESS,
	payload: user,
});

export const fetchUserFailure = (error) => ({
	type: FETCH_USER_FAILURE,
	payload: error,
});

export const fetchUser = (username, password) => {
	return (dispatch) => {
		dispatch(fetchUserRequest());
		axios
			.post(`${process.env.REACT_APP_API_URL}/users`, {
				username,
				password,
			})
			.then((response) => {
				const user = response.data;
				dispatch(fetchUserSuccess(user));
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(fetchUserFailure(errorMsg));
			});
	};
};
