import axios from "axios";

export const ADD_FRIEND_REQUEST = "ADD_FRIEND_REQUEST";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_FAILURE = "ADD_FRIEND_FAILURE";

export const addFriendRequest = () => ({
	type: ADD_FRIEND_REQUEST,
});

export const addFriendSuccess = (friend) => ({
	type: ADD_FRIEND_SUCCESS,
	payload: friend,
});

export const addFriendFailure = (error) => ({
	type: ADD_FRIEND_FAILURE,
	payload: error,
});

export const addFriend = (data) => {
	return (dispatch) => {
		dispatch(addFriendRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/users/add-friend`, data)
			.then((response) => {
				const friend = response.data;
				dispatch(addFriendSuccess(friend));
				return Promise.resolve(friend);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(addFriendFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
