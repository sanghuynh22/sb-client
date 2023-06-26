import {
	DELETE_FRIEND_REQUEST,
	DELETE_FRIEND_SUCCESS,
	DELETE_FRIEND_FAILURE,
} from "../../actions/user/deleteFriend";

const initialState = {
	isDeleteFriend: false,
	friend: null,
	error: "",
};

const deleteFriendReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_FRIEND_REQUEST:
			return {
				...state,
				isDeleteFriend: true,
			};
		case DELETE_FRIEND_SUCCESS:
			return {
				isDeleteFriend: false,
				friend: action.payload,
				error: "",
			};
		case DELETE_FRIEND_FAILURE:
			return {
				isDeleteFriend: false,
				friend: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default deleteFriendReducer;
