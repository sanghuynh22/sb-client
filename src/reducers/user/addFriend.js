import {
	ADD_FRIEND_REQUEST,
	ADD_FRIEND_SUCCESS,
	ADD_FRIEND_FAILURE,
} from "../../actions/user/addFriend";

const initialState = {
	isAddingFriend: false,
	friend: null,
	error: "",
};

const addFriendReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FRIEND_REQUEST:
			return {
				...state,
				isAddingFriend: true,
			};
		case ADD_FRIEND_SUCCESS:
			return {
				isAddingFriend: false,
				friend: action.payload,
				error: "",
			};
		case ADD_FRIEND_FAILURE:
			return {
				isAddingFriend: false,
				friend: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default addFriendReducer;
