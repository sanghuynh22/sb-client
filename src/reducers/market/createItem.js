import {
	CREATE_ITEM_REQUEST,
	CREATE_ITEM_SUCCESS,
	CREATE_ITEM_FAILURE,
} from "../../actions/market/createItem";

const initialState = {
	isCreating: false,
	item: null,
	error: "",
};

const createItemReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ITEM_REQUEST:
			return {
				...state,
				isCreating: true,
			};
		case CREATE_ITEM_SUCCESS:
			return {
				isCreating: false,
				item: action.payload,
				error: "",
			};
		case CREATE_ITEM_FAILURE:
			return {
				isCreating: false,
				item: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default createItemReducer;
