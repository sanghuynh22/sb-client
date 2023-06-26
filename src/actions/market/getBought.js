import axios from "axios";

export const GET_BOUGHT_REQUEST = "GET_BOUGHT_REQUEST";
export const GET_BOUGHT_SUCCESS = "GET_BOUGHT_SUCCESS";
export const GET_BOUGHT_FAILURE = "GET_BOUGHT_FAILURE";

export const getBoughtRequest = () => ({
	type: GET_BOUGHT_REQUEST,
});

export const getBoughtSuccess = (item) => ({
	type: GET_BOUGHT_SUCCESS,
	payload: item,
});

export const getBoughtFailure = (error) => ({
	type: GET_BOUGHT_FAILURE,
	payload: error,
});

export const getBought = (idBuyer) => {
	return (dispatch) => {
		dispatch(getBoughtRequest());
		return axios
			.get(`${process.env.REACT_APP_API_URL}/market/bought/${idBuyer}`)
			.then((response) => {
				const boughtItems = response.data;
				dispatch(getBoughtSuccess(boughtItems));
				return Promise.resolve(boughtItems);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(getBoughtFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
