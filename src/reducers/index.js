import { combineReducers } from "redux";
import authReducer from "./user/auth";
import fetchUserReducer from "./user/fetchUser";
import fetchAllUsersReducer from "./user/fetchAllUsers";
import registerUserReducer from "./user/registerUser";
import loginUserReducer from "./user/loginUser";
import updateUserReducer from "./user/updateUser";
import addFriendReducer from "./user/addFriend";
import deleteFriendReducer from "./user/deleteFriend";
import deleteRequestFriendReducer from "./user/deleteRequestAdd";
import acceptRequestFriendReducer from "./user/acceptRequest";
import createStatusReducer from "./status/createStatus";
import getAllStatusReducer from "./status/getAllStatus";
import deleteStatusReducer from "./status/deleteStatus";
import hideStatusReducer from "./status/hideStatus";
import likeStatusReducer from "./status/likeStatus";
import createCommentReducer from "./status/createComment";
import createStoryReducer from "./story/createStory";
import getAllStoryReducer from "./story/getAllStory";
import createWatchReducer from "./watch/createWatch";
import getAllWatchReducer from "./watch/getAllWatch";
import createItemReducer from "./market/createItem";
import getAllItemReducer from "./market/getAllItem";
import getBoughtReducer from "./market/getBought";
import buyItemReducer from "./market/buyItem";

const rootReducer = combineReducers({
	user: combineReducers({
		auth: authReducer,
		fetchUser: fetchUserReducer,
		fetchAllUsers: fetchAllUsersReducer,
		registerUser: registerUserReducer,
		loginUser: loginUserReducer,
		updateUser: updateUserReducer,
		addFriend: addFriendReducer,
		deleteFriend: deleteFriendReducer,
		deleteRequestFriend: deleteRequestFriendReducer,
		acceptRequestFriend: acceptRequestFriendReducer,
	}),
	status: combineReducers({
		createStatus: createStatusReducer,
		getAllStatus: getAllStatusReducer,
		deleteStatus: deleteStatusReducer,
		hideStatus: hideStatusReducer,
		likeStatus: likeStatusReducer,
		createComment: createCommentReducer,
	}),
	story: combineReducers({
		createStory: createStoryReducer,
		getAllStory: getAllStoryReducer,
	}),
	watch: combineReducers({
		createWatch: createWatchReducer,
		getAllWatch: getAllWatchReducer,
	}),
	market: combineReducers({
		createMarket: createItemReducer,
		getAllItem: getAllItemReducer,
		buyItem: buyItemReducer,
		getBought: getBoughtReducer,
	}),
});

export default rootReducer;
