import {
	FETCH_MESSAGES_REQUEST,
	FETCH_MESSAGES_SUCCESS,
	FETCH_MESSAGES_FAILURE,
} from "../../actions/user/fetchMessages";

const initialState = {
	isLoading: false,
	mess: null,
	error: "",
};

const fetchMessagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MESSAGES_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_MESSAGES_SUCCESS:
			return {
				isLoading: false,
				mess: action.payload,
				error: "",
			};
		case FETCH_MESSAGES_FAILURE:
			return {
				isLoading: false,
				mess: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default fetchMessagesReducer;
