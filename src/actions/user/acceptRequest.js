import axios from "axios";

export const ACRRPT_FRIEND_REQUEST = "ACRRPT_FRIEND_REQUEST";
export const ACRRPT_FRIEND_SUCCESS = "ACRRPT_FRIEND_SUCCESS";
export const ACRRPT_FRIEND_FAILURE = "ACRRPT_FRIEND_FAILURE";

export const acceptRequestFriendRequest = () => ({
	type: ACRRPT_FRIEND_REQUEST,
});

export const acceptRequestFriendSuccess = (friend) => ({
	type: ACRRPT_FRIEND_SUCCESS,
	payload: friend,
});

export const acceptRequestFriendFailure = (error) => ({
	type: ACRRPT_FRIEND_FAILURE,
	payload: error,
});

export const acceptRequestFriend = (data) => {
	return (dispatch) => {
		dispatch(acceptRequestFriendRequest());
		return axios
			.post(
				`${process.env.REACT_APP_API_URL}/users/accept-friend-request`,
				data
			)
			.then((response) => {
				const friend = response.data;
				dispatch(acceptRequestFriendSuccess(friend));
				return Promise.resolve(friend);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(acceptRequestFriendFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
