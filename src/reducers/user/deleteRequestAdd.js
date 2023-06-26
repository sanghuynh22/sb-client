import {
	DELETE_REQUEST_FRIEND_REQUEST,
	DELETE_REQUEST_FRIEND_SUCCESS,
	DELETE_REQUEST_FRIEND_FAILURE,
} from "../../actions/user/deleteRequestAdd";

const initialState = {
	isDeleteFriend: false,
	friend: null,
	error: "",
};

const deleteRequestFriendReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_REQUEST_FRIEND_REQUEST:
			return {
				...state,
				isDeleteFriend: true,
			};
		case DELETE_REQUEST_FRIEND_SUCCESS:
			return {
				isDeleteFriend: false,
				friend: action.payload,
				error: "",
			};
		case DELETE_REQUEST_FRIEND_FAILURE:
			return {
				isDeleteFriend: false,
				friend: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default deleteRequestFriendReducer;
