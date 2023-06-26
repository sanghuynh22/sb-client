import axios from "axios";

export const DELETE_FRIEND_REQUEST = "DELETE_FRIEND_REQUEST";
export const DELETE_FRIEND_SUCCESS = "DELETE_FRIEND_SUCCESS";
export const DELETE_FRIEND_FAILURE = "DELETE_FRIEND_FAILURE";

export const deleteFriendRequest = () => ({
	type: DELETE_FRIEND_REQUEST,
});

export const deleteFriendSuccess = (friend) => ({
	type: DELETE_FRIEND_SUCCESS,
	payload: friend,
});

export const deleteFriendFailure = (error) => ({
	type: DELETE_FRIEND_FAILURE,
	payload: error,
});

export const deleteFriend = (data) => {
	return (dispatch) => {
		dispatch(deleteFriendRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/users/delete-friend`, data)
			.then((response) => {
				const friend = response.data;
				dispatch(deleteFriendSuccess(friend));
				return Promise.resolve(friend);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(deleteFriendFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
