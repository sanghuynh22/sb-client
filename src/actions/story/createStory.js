import axios from "axios";

export const CREATE_STORY_REQUEST = "CREATE_STORY_REQUEST";
export const CREATE_STORY_SUCCESS = "CREATE_STORY_SUCCESS";
export const CREATE_STORY_FAILURE = "CREATE_STORY_FAILURE";

export const createStoryRequest = () => ({
	type: CREATE_STORY_REQUEST,
});

export const createStorySuccess = (story) => ({
	type: CREATE_STORY_SUCCESS,
	payload: story,
});

export const createStoryFailure = (error) => ({
	type: CREATE_STORY_FAILURE,
	payload: error,
});

export const createStory = (data) => {
	return (dispatch) => {
		dispatch(createStoryRequest());
		return axios
			.post(`${process.env.REACT_APP_API_URL}/story`, data)
			.then((response) => {
				const story = response.data;
				dispatch(createStorySuccess(story));
				return Promise.resolve(story);
			})
			.catch((error) => {
				const errorMsg = error.error;
				dispatch(createStoryFailure(errorMsg));
				return Promise.reject(errorMsg);
			});
	};
};
