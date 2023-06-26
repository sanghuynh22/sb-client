import {
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
} from "../../actions/user/fetchUser";

const initialState = {
	isLoading: false,
	user: null,
	error: "",
};

const fetchUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_USER_SUCCESS:
			return {
				isLoading: false,
				user: action.payload,
				error: "",
			};
		case FETCH_USER_FAILURE:
			return {
				isLoading: false,
				user: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default fetchUserReducer;
