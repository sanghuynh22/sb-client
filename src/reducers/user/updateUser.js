import {
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
} from "../../actions/user/updateUser";

const initialState = {
	isUpdated: false,
	user: null,
	error: "",
};

const updateUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
			return {
				...state,
				isUpdated: true,
			};
		case UPDATE_USER_SUCCESS:
			return {
				isUpdated: false,
				user: action.payload,
				error: "",
			};
		case UPDATE_USER_FAILURE:
			return {
				isUpdated: false,
				user: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default updateUserReducer;
