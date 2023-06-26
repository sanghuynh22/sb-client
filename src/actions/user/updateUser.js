import axios from "axios";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const updateUserRequest = () => ({
	type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (user) => ({
	type: UPDATE_USER_SUCCESS,
	payload: user,
});

export const updateUserFailure = (error) => ({
	type: UPDATE_USER_FAILURE,
	payload: error,
});

export const updateUser = (data) => {
	return (dispatch) => {
		dispatch(updateUserRequest());
		return axios
			.put(`${process.env.REACT_APP_API_URL}/users/`, data)
			.then((response) => {
				const user = response.data;
				dispatch(updateUserSuccess(user));

				return Promise.resolve(user);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(updateUserFailure(errorMsg));

				return Promise.reject(error);
			});
	};
};
