import { AUTH_LOGIN, AUTH_LOGOUT } from "../../actions/user/auth";

const initialState = {
	isLogged: false,
	currentUser: null,
	error: "",
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_LOGIN:
			return {
				...state,
				currentUser: action.payload,
				isLoggedIn: true,
			};
		case AUTH_LOGOUT:
			return {
				...state,
				currentUser: null,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};

export default authReducer;
