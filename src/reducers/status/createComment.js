import {
	CREATE_COMMENT_REQUEST,
	CREATE_COMMENT_SUCCESS,
	CREATE_COMMENT_FAILURE,
} from "../../actions/status/createComment";

const initialState = {
	isCreating: false,
	comment: null,
	error: "",
};

const createCommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_COMMENT_REQUEST:
			return {
				...state,
				isCreating: true,
			};
		case CREATE_COMMENT_SUCCESS:
			return {
				isCreating: false,
				comment: action.payload,
				error: "",
			};
		case CREATE_COMMENT_FAILURE:
			return {
				isCreating: false,
				comment: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default createCommentReducer;
