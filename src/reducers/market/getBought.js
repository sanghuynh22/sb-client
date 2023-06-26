import {
	GET_BOUGHT_REQUEST,
	GET_BOUGHT_SUCCESS,
	GET_BOUGHT_FAILURE,
} from "../../actions/market/getBought";

const initialState = {
	isGet: false,
	boughtItems: null,
	error: "",
};

const getBoughtReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOUGHT_REQUEST:
			return {
				...state,
				isGet: true,
			};
		case GET_BOUGHT_SUCCESS:
			return {
				isGet: false,
				boughtItems: action.payload,
				error: "",
			};
		case GET_BOUGHT_FAILURE:
			return {
				isGet: false,
				boughtItems: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getBoughtReducer;
