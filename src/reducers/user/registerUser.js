import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
} from "../../actions/user/registerUser";

const initialState = {
	isRegistering: false,
	user: null,
	error: "",
};

const registerUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				...state,
				isRegistering: true,
			};
		case REGISTER_USER_SUCCESS:
			return {
				isRegistering: false,
				user: action.payload,
				error: "",
			};
		case REGISTER_USER_FAILURE:
			return {
				isRegistering: false,
				user: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default registerUserReducer;
