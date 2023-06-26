import {
	LIKE_STATUS_REQUEST,
	LIKE_STATUS_SUCCESS,
	LIKE_STATUS_FAILURE,
} from "../../actions/status/likeStatus";

const initialState = {
	isLiking: false,
	status: null,
	error: "",
};

const likeStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIKE_STATUS_REQUEST:
			return {
				...state,
				isLiking: true,
			};
		case LIKE_STATUS_SUCCESS:
			return {
				isLiking: false,
				status: action.payload,
				error: "",
			};
		case LIKE_STATUS_FAILURE:
			return {
				isLiking: false,
				status: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default likeStatusReducer;
