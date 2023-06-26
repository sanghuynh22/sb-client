import {
	GET_ALL_WATCH_REQUEST,
	GET_ALL_WATCH_SUCCESS,
	GET_ALL_WATCH_FAILURE,
} from "../../actions/watch/getAllWatch";

const initialState = {
	isGet: false,
	watches: null,
	error: "",
};

const getAllWatchReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_WATCH_REQUEST:
			return {
				...state,
				isGet: true,
			};
		case GET_ALL_WATCH_SUCCESS:
			return {
				isGet: false,
				watches: action.payload,
				error: "",
			};
		case GET_ALL_WATCH_FAILURE:
			return {
				isGet: false,
				watches: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getAllWatchReducer;
