import {
	DELETE_STATUS_REQUEST,
	DELETE_STATUS_SUCCESS,
	DELETE_STATUS_FAILURE,
} from "../../actions/status/deleteStatus";

const initialState = {
	isDeleting: false,
	deletedStatus: null,
	error: "",
};

const deleteStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_STATUS_REQUEST:
			return {
				...state,
				isDeleting: true,
			};
		case DELETE_STATUS_SUCCESS:
			return {
				isDeleting: false,
				deletedStatus: action.payload,
				error: "",
			};
		case DELETE_STATUS_FAILURE:
			return {
				isDeleting: false,
				deletedStatus: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default deleteStatusReducer;
