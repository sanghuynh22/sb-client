import {
	CREATE_STATUS_REQUEST,
	CREATE_STATUS_SUCCESS,
	CREATE_STATUS_FAILURE,
} from "../../actions/status/createStatus";

const initialState = {
	isCreating: false,
	status: null,
	error: "",
};

const createStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_STATUS_REQUEST:
			return {
				...state,
				isCreating: true,
			};
		case CREATE_STATUS_SUCCESS:
			return {
				isCreating: false,
				status: action.payload,
				error: "",
			};
		case CREATE_STATUS_FAILURE:
			return {
				isCreating: false,
				status: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default createStatusReducer;
