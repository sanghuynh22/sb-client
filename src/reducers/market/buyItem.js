import {
	BUY_ITEM_REQUEST,
	BUY_ITEM_SUCCESS,
	BUY_ITEM_FAILURE,
} from "../../actions/market/buyItem";

const initialState = {
	isCreating: false,
	item: null,
	error: "",
};

const buyItemReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUY_ITEM_REQUEST:
			return {
				...state,
				isCreating: true,
			};
		case BUY_ITEM_SUCCESS:
			return {
				isCreating: false,
				item: action.payload,
				error: "",
			};
		case BUY_ITEM_FAILURE:
			return {
				isCreating: false,
				item: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default buyItemReducer;
