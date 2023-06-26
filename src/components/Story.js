import React, { useEffect, useMemo, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useNavigate,
} from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { TiSortAlphabetically } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import StoryCreate from "./StoryCreate";
import { useParams } from "react-router-dom";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import { formatDate } from "../time/formatTime";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
const Story = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let { userId } = useParams();
	const [activeUser, setActiveUser] = useState(userId);
	const [activeStory, setActiveStory] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [timer, setTimer] = useState(null);
	const { currentUser } = useSelector((state) => state.user.auth);
	const { users } = useSelector((state) => state.user.fetchAllUsers);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [userId]);
	useEffect(() => {
		startProgress();
	}, [activeUser, activeStory]);
	const handleClickOut = () => {
		navigate("/");
	};
	const sortedUsers = useMemo(() => {
		return users
			?.filter((user) => user.stories.length !== 0)
			.sort((a, b) => {
				// Đưa user có _id bằng userId lên đầu tiên
				if (a._id === userId) return -1;
				if (b._id === userId) return 1;
				// Đưa user có _id bằng currentUser._id lên thứ hai
				if (a._id === currentUser?._id) return -1;
				if (b._id === currentUser?._id) return 1;
				// Giữ nguyên thứ tự của các user khác
				return 0;
			});
	}, [users, currentUser]);

	const startProgress = async () => {
		if (timer) {
			clearInterval(timer);
		}
		setProgress(0);
		let counter = 0;
		const newTimer = setInterval(async () => {
			if (!isPaused) {
				counter++;
				setProgress(counter);
				if (counter === 100) {
					clearInterval(newTimer);
					nextStory();
				}
				// Tạm dừng vòng lặp mỗi 20 lần để cập nhật UI
				if (counter % 20 === 0) {
					await pause();
				}
			}
		}, 50);
		setTimer(newTimer);
	};

	// Hàm tạo ra một promise với setTimeout
	const pause = () => {
		return new Promise((resolve) => setTimeout(resolve, 0));
	};

	const nextStory = () => {
		let currentUser = sortedUsers?.find((user) => user._id === activeUser);

		if (!currentUser || !currentUser.stories) return;

		if (activeStory < currentUser.stories.length - 1) {
			setActiveStory(activeStory + 1);
			startProgress();
		} else {
			nextUser();
		}
	};

	const nextUser = () => {
		let currentUserIndex = sortedUsers?.findIndex(
			(user) => user._id === activeUser
		);

		if (currentUserIndex < sortedUsers.length - 1) {
			setActiveUser(sortedUsers[currentUserIndex + 1]._id);
			setActiveStory(0);

			startProgress();
		} else {
			// alert("Đã hết story");
			clearInterval(timer);
		}
	};
	const handleClickUser = (userId) => {
		setActiveUser(userId);
		setActiveStory(0);
		startProgress();
	};

	return (
		<div className="story">
			{users && userId ? (
				<>
					<div className="story_left" key={users.length}>
						<div className="storyCreate_top">
							<div
								className="storyCreate_out_container"
								onClick={() => handleClickOut()}
							>
								<AiOutlineClose className="storyCreate_out" />
							</div>
							<Link to="/">
								<img src={logo} className="logo" />
							</Link>
						</div>
						<div className="story_left_title">Tin</div>
						{sortedUsers?.map((user, i) => (
							<>
								<div
									key={user._id}
									className={
										activeUser == user._id
											? "story_left_option active"
											: "story_left_option"
									}
									onClick={() => handleClickUser(user._id)}
								>
									<div className="story_left_option_avatar">
										<img
											src={user?.avatar ? user.avatar : avatar}
											className="story_left_option_avatar_img"
										/>
									</div>
									<div className="story_left_option_info">
										<p className="story_left_option_info_name">
											{user.username}
										</p>
										<p className="story_left_option_info_time">
											{formatDate(
												user.stories[user.stories.length - 1].createdAt
											)}
										</p>
									</div>
								</div>
							</>
						))}
					</div>
					<div className="story_center">
						{/* {!isCreateImage && !isCreateVideo && ( */}
						{sortedUsers?.findIndex((user) => user._id === activeUser) ===
							sortedUsers.length - 1 &&
						activeStory === currentUser?.stories.length ? (
							<></>
						) : (
							<>
								<div className="storyCreate_img_container">
									{sortedUsers?.find((user) => user._id === activeUser)
										?.stories[activeStory]?.type == "image" ? (
										<div
											className="storyCreate_img_content"
											onClick={() => setIsPaused(!isPaused)}
										>
											<img
												src={
													sortedUsers?.find((user) => user._id === activeUser)
														?.stories[activeStory]?.src
												}
												className="storyCreate_img_content"
											/>
											<div className="progress_bar_container">
												{sortedUsers
													?.find((user) => user._id === activeUser)
													?.stories.map((story, i) => (
														<div
															className="story_progress_bar"
															style={{
																width: `calc(100% / ${
																	sortedUsers.find(
																		(user) => user._id === activeUser
																	).stories.length
																})`,
															}}
														>
															<div
																className="progress_bar"
																// Tính toán độ rộng tối đa của progress bar
																style={{
																	width: `${
																		i === activeStory
																			? progress
																			: i < activeStory
																			? 100
																			: 0
																	}%`,
																}}
															></div>
														</div>
													))}
											</div>
										</div>
									) : (
										<div
											className="storyCreate_img_content"
											onClick={() => setIsPaused(!isPaused)}
											style={{
												backgroundColor: sortedUsers?.find(
													(user) => user._id === activeUser
												)?.stories[activeStory]?.backgroundColor,
											}}
										>
											<p className="storyCreate_img_content_p">
												{
													sortedUsers.find((user) => user._id === activeUser)
														?.stories[activeStory]?.text
												}
											</p>
											<div className="progress_bar_container">
												{sortedUsers
													?.find((user) => user._id === activeUser)
													?.stories.map((story, i) => (
														<div
															className="story_progress_bar"
															style={{
																width: `calc(100% / ${
																	sortedUsers.find(
																		(user) => user._id === activeUser
																	).stories.length
																})`,
															}}
														>
															<div
																className="progress_bar"
																// Tính toán độ rộng tối đa của progress bar
																style={{
																	width: `${
																		i === activeStory
																			? progress
																			: i < activeStory
																			? 100
																			: 0
																	}%`,
																}}
															></div>
														</div>
													))}
											</div>
										</div>
									)}
								</div>
							</>
						)}

						{/* )} */}
						{/* {isCreateImage && (
					<div className="storyCreate_img_container">
						<div className="storyCreate_img_titlr_container">
							<p className="storyCreate_img_title">Xem trước</p>
						</div>
						<div className="storyCreate_img_content" style={{ background }}>
							{text ? (
								<p className="storyCreate_img_content_p">{text}</p>
							) : (
								<p
									className="storyCreate_img_content_p"
									style={{ color: "#9ab7ec" }}
								>
									Hãy nhập nội dung
								</p>
							)}
						</div>
					</div>
				)} */}
					</div>
				</>
			) : (
				<StoryCreate />
			)}
		</div>
	);
};

export default Story;
