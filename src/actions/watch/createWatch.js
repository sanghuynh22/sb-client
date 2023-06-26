import axios from "axios";

export const CREATE_WATCH_REQUEST = "CREATE_WATCH_REQUEST";
export const CREATE_WATCH_SUCCESS = "CREATE_WATCH_SUCCESS";
export const CREATE_WATCH_FAILURE = "CREATE_WATCH_FAILURE";

export const createWatchRequest = () => ({
	type: CREATE_WATCH_REQUEST,
});

export const createWatchSuccess = (watch) => ({
	type: CREATE_WATCH_SUCCESS,
	payload: watch,
});

export const createWatchFailure = (error) => ({
	type: CREATE_WATCH_FAILURE,
	payload: error,
});

export const createWatch = ({ title, user, file }) => {
	return (dispatch) => {
		const formData = new FormData();
		formData.append("title", title);
		formData.append("user", user);
		formData.append("likes", 120);
		formData.append("view", 500);
		formData.append("file", file);

		dispatch(createWatchRequest());
		return axios
			.post("http://localhost:3000/api/watch", formData)
			.then((response) => {
				console.log("formData : ", formData);

				const watch = response.data;
				dispatch(createWatchSuccess(watch));
				return Promise.resolve(watch);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(createWatchFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
