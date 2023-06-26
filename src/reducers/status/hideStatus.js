import {
	HIDE_STATUS_REQUEST,
	HIDE_STATUS_SUCCESS,
	HIDE_STATUS_FAILURE,
} from "../../actions/status/hideStatus";

const initialState = {
	isHide: false,
	userHide: null,
	error: "",
};

const hideStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case HIDE_STATUS_REQUEST:
			return {
				...state,
				isHide: true,
			};
		case HIDE_STATUS_SUCCESS:
			return {
				isHide: false,
				userHide: action.payload,
				error: "",
			};
		case HIDE_STATUS_FAILURE:
			return {
				isHide: false,
				userHide: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default hideStatusReducer;
