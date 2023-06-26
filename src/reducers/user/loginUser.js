import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
} from "../../actions/user/loginUser";

const initialState = {
	isLoggingIn: false,
	user: null,
	error: "",
};

const loginUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER_REQUEST:
			return {
				...state,
				isLoggingIn: true,
			};
		case LOGIN_USER_SUCCESS:
			return {
				isLoggingIn: false,
				user: action.payload,
				error: "",
			};
		case LOGIN_USER_FAILURE:
			return {
				isLoggingIn: false,
				user: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default loginUserReducer;
