import axios from "axios";

export const BUY_ITEM_REQUEST = "BUY_ITEM_REQUEST";
export const BUY_ITEM_SUCCESS = "BUY_ITEM_SUCCESS";
export const BUY_ITEM_FAILURE = "BUY_ITEM_FAILURE";

export const buyItemRequest = () => ({
	type: BUY_ITEM_REQUEST,
});

export const buyItemSuccess = (item) => ({
	type: BUY_ITEM_SUCCESS,
	payload: item,
});

export const buyItemFailure = (error) => ({
	type: BUY_ITEM_FAILURE,
	payload: error,
});

export const buyItem = (data) => {
	return (dispatch) => {
		dispatch(buyItemRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/market/buy`, data)
			.then((response) => {
				const item = response.data;
				dispatch(buyItemSuccess(item));
				return Promise.resolve(item);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(buyItemFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
