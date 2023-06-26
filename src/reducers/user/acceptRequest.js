import {
	ACRRPT_FRIEND_REQUEST,
	ACRRPT_FRIEND_SUCCESS,
	ACRRPT_FRIEND_FAILURE,
} from "../../actions/user/acceptRequest";

const initialState = {
	isAcceptFriend: false,
	friend: null,
	error: "",
};

const acceptRequestFriendReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACRRPT_FRIEND_REQUEST:
			return {
				...state,
				isAcceptFriend: true,
			};
		case ACRRPT_FRIEND_SUCCESS:
			return {
				isAcceptFriend: false,
				friend: action.payload,
				error: "",
			};
		case ACRRPT_FRIEND_FAILURE:
			return {
				isAcceptFriend: false,
				friend: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default acceptRequestFriendReducer;
