import {
	GET_ALL_ITEM_REQUEST,
	GET_ALL_ITEM_SUCCESS,
	GET_ALL_ITEM_FAILURE,
} from "../../actions/market/getAllItem";

const initialState = {
	isGet: false,
	items: null,
	error: "",
};

const getAllItemReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_ITEM_REQUEST:
			return {
				...state,
				isGet: true,
			};
		case GET_ALL_ITEM_SUCCESS:
			return {
				isGet: false,
				items: action.payload,
				error: "",
			};
		case GET_ALL_ITEM_FAILURE:
			return {
				isGet: false,
				items: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getAllItemReducer;
