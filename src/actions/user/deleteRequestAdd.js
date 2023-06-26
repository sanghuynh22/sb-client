import axios from "axios";

export const DELETE_REQUEST_FRIEND_REQUEST = "DELETE_REQUEST_FRIEND_REQUEST";
export const DELETE_REQUEST_FRIEND_SUCCESS = "DELETE_REQUEST_FRIEND_SUCCESS";
export const DELETE_REQUEST_FRIEND_FAILURE = "DELETE_REQUEST_FRIEND_FAILURE";

export const deleteRequestFriendRequest = () => ({
	type: DELETE_REQUEST_FRIEND_REQUEST,
});

export const deleteRequestFriendSuccess = (friend) => ({
	type: DELETE_REQUEST_FRIEND_SUCCESS,
	payload: friend,
});

export const deleteRequestFriendFailure = (error) => ({
	type: DELETE_REQUEST_FRIEND_FAILURE,
	payload: error,
});

export const deleteRequestFriend = (data) => {
	return (dispatch) => {
		dispatch(deleteRequestFriendRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/users/deny-friend-request`, data)
			.then((response) => {
				const friend = response.data;
				dispatch(deleteRequestFriendSuccess(friend));
				return Promise.resolve(friend);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(deleteRequestFriendFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
