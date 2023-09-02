import axios from "axios";

export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

export const fetchMessagesRequest = () => ({
	type: FETCH_MESSAGES_REQUEST,
});

export const fetchMessagesSuccess = (messages) => ({
	type: FETCH_MESSAGES_SUCCESS,
	payload: messages,
});

export const fetchMessagesFailure = (error) => ({
	type: FETCH_MESSAGES_FAILURE,
	payload: error,
});

export const fetchMessages = (data) => {
	return (dispatch) => {
		console.log("fetch data:::", data);
		dispatch(fetchMessagesRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/message/`, data)
			.then((response) => {
				const messages = response.data;
				dispatch(fetchMessagesSuccess(messages));
				return Promise.resolve(messages);
			})
			.catch((error) => {
				const errorMsg = error.message;
				dispatch(fetchMessagesFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
