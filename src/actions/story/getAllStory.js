import axios from "axios";

export const GET_ALL_STORY_REQUEST = "GET_ALL_STORY_REQUEST";
export const GET_ALL_STORY_SUCCESS = "GET_ALL_STORY_SUCCESS";
export const GET_ALL_STORY_FAILURE = "GET_ALL_STORY_FAILURE";

export const getAllStoryRequest = () => ({
	type: GET_ALL_STORY_REQUEST,
});

export const getAllStorySuccess = (stories) => ({
	type: GET_ALL_STORY_SUCCESS,
	payload: stories,
});

export const getAllStoryFailure = (error) => ({
	type: GET_ALL_STORY_FAILURE,
	payload: error,
});

export const getAllStory = () => {
	return (dispatch) => {
		dispatch(getAllStoryRequest());
		return axios
			.get(`${process.env.REACT_APP_API_URL}/users`)
			.then((response) => {
				const stories = response.data;
				dispatch(getAllStorySuccess(stories));
				return Promise.resolve(stories);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(getAllStoryFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
