import {
	GET_ALL_STATUS_REQUEST,
	GET_ALL_STATUS_SUCCESS,
	GET_ALL_STATUS_FAILURE,
} from "../../actions/status/getAllStatus";

const initialState = {
	isGet: false,
	statuses: null,
	error: "",
};

const getAllStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_STATUS_REQUEST:
			return {
				...state,
				isGet: true,
			};
		case GET_ALL_STATUS_SUCCESS:
			return {
				isGet: false,
				statuses: action.payload,
				error: "",
			};
		case GET_ALL_STATUS_FAILURE:
			return {
				isGet: false,
				statuses: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getAllStatusReducer;
