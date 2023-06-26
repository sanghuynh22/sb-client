import {
	GET_ALL_STORY_REQUEST,
	GET_ALL_STORY_SUCCESS,
	GET_ALL_STORY_FAILURE,
} from "../../actions/story/getAllStory";

const initialState = {
	isGet: false,
	stories: null,
	error: "",
};

const getAllStoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_STORY_REQUEST:
			return {
				...state,
				isGet: true,
			};
		case GET_ALL_STORY_SUCCESS:
			return {
				isGet: false,
				stories: action.payload,
				error: "",
			};
		case GET_ALL_STORY_FAILURE:
			return {
				isGet: false,
				stories: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getAllStoryReducer;
