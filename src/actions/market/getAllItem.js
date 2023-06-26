import axios from "axios";

export const GET_ALL_ITEM_REQUEST = "GET_ALL_ITEM_REQUEST";
export const GET_ALL_ITEM_SUCCESS = "GET_ALL_ITEM_SUCCESS";
export const GET_ALL_ITEM_FAILURE = "GET_ALL_ITEM_FAILURE";

export const getAllItemRequest = () => ({
	type: GET_ALL_ITEM_REQUEST,
});

export const getAllItemSuccess = (items) => ({
	type: GET_ALL_ITEM_SUCCESS,
	payload: items,
});

export const getAllItemFailure = (error) => ({
	type: GET_ALL_ITEM_FAILURE,
	payload: error,
});

export const getAllItem = () => {
	return (dispatch) => {
		dispatch(getAllItemRequest());
		return axios
			.get(`${process.env.REACT_APP_API_URL}/market`)
			.then((response) => {
				const stories = response.data;
				dispatch(getAllItemSuccess(stories));
				return Promise.resolve(stories);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(GET_ALL_ITEM_FAILURE(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
