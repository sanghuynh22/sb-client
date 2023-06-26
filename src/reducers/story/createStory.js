import {
	CREATE_STORY_REQUEST,
	CREATE_STORY_SUCCESS,
	CREATE_STORY_FAILURE,
} from "../../actions/story/createStory";

const initialState = {
	isCreating: false,
	story: null,
	error: "",
};

const createStoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_STORY_REQUEST:
			return {
				...state,
				isCreating: true,
			};
		case CREATE_STORY_SUCCESS:
			return {
				isCreating: false,
				story: action.payload,
				error: "",
			};
		case CREATE_STORY_FAILURE:
			return {
				isCreating: false,
				story: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default createStoryReducer;
