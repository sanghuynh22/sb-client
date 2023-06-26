import {
	CREATE_WATCH_REQUEST,
	CREATE_WATCH_SUCCESS,
	CREATE_WATCH_FAILURE,
} from "../../actions/watch/createWatch";

const initialState = {
	isCreating: false,
	watch: null,
	error: "",
};

const createWatchReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_WATCH_REQUEST:
			return {
				...state,
				isCreating: true,
			};
		case CREATE_WATCH_SUCCESS:
			return {
				isCreating: false,
				watch: action.payload,
				error: "",
			};
		case CREATE_WATCH_FAILURE:
			return {
				isCreating: false,
				watch: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default createWatchReducer;
