import axios from "axios";

export const CREATE_ITEM_REQUEST = "CREATE_ITEM_REQUEST";
export const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
export const CREATE_ITEM_FAILURE = "CREATE_ITEM_FAILURE";

export const createItemRequest = () => ({
	type: CREATE_ITEM_REQUEST,
});

export const createItemSuccess = (item) => ({
	type: CREATE_ITEM_SUCCESS,
	payload: item,
});

export const createItemFailure = (error) => ({
	type: CREATE_ITEM_FAILURE,
	payload: error,
});

export const createItem = (data) => {
	return (dispatch) => {
		dispatch(createItemRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/market`, data)
			.then((response) => {
				const item = response.data;
				dispatch(createItemSuccess(item));
				return Promise.resolve(item);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(createItemFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
