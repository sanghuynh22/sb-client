import {
	FETCH_ALL_USERS_REQUEST,
	FETCH_ALL_USERS_SUCCESS,
	FETCH_ALL_USERS_FAILURE,
} from "../../actions/user/fetchAllUsers";

const initialState = {
	isLoading: false,
	users: null,
	error: "",
};

const fetchAllUsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALL_USERS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_ALL_USERS_SUCCESS:
			return {
				isLoading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_ALL_USERS_FAILURE:
			return {
				isLoading: false,
				users: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default fetchAllUsersReducer;
