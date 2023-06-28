import React, { useEffect, useState } from "react";
import moment from "moment";
import "../index.css";
import { Facebook } from "react-content-loader";
import { FaUserFriends } from "react-icons/fa";
import { MdSmartDisplay } from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoMdSend, IoIosCloseCircleOutline } from "react-icons/io";
import { TbShare3 } from "react-icons/tb";
import {
	BiVideoRecording,
	BiDotsHorizontalRounde,
	BiCommentDetail,
	BiDotsHorizontalRounded,
	BiShare,
	BiComment,
} from "react-icons/bi";
import {
	AiFillShop,
	AiOutlinePlus,
	AiFillPicture,
	AiOutlineClose,
	AiOutlineLike,
} from "react-icons/ai";
import { BsMessenger, BsBookFill, BsPlayCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { getAllStatus } from "../actions/status/getAllStatus";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { createComment } from "../actions/status/createComment";
import { formatDate } from "../time/formatTime";
import { likeStatus } from "../actions/status/likeStatus";
import { hideStatus } from "../actions/status/hideStatus";
import { deleteStatus } from "../actions/status/deleteStatus";
import { useParams } from "react-router-dom";
const Status = ({ userProfile }) => {
	const [showSkeleton, setShowSkeleton] = useState(true);
	const dispatch = useDispatch();
	let { userId } = useParams();
	const [content, setContent] = useState("");
	const { isCreating } = useSelector((state) => state.status.createComment);
	const { statuses, isGet } = useSelector((state) => state.status.getAllStatus);
	const { currentUser } = useSelector((state) => state.user.auth);
	useEffect(() => {
		dispatch(getAllStatus()).then(() => {
			setShowSkeleton(false);
		});
	}, []);
	// useEffect(() => {
	// 	setShowSkeleton(isGet);
	// }, []);
	//comments
	const handleEnter = async (e, statusId) => {
		let user = await currentUser._id;

		if (content) {
			if (e.key === "Enter") {
				dispatch(createComment({ content, user, statusId })).then((comment) => {
					dispatch(getAllStatus());
					setContent("");
				});
			}
		}
	};
	const handleClickCreateComment = async (statusId) => {
		let user = await currentUser._id;
		if (content) {
			dispatch(createComment({ content, user, statusId })).then((comment) => {
				dispatch(getAllStatus());
				setContent("");
			});
		}
	};
	const handleClickLike = (statusId, userId) => {
		dispatch(likeStatus(statusId, userId)).then((status) => {
			dispatch(getAllStatus());
		});
	};
	const handleClickDeleteStatus = async (statusId, userIdOfStatus, userId) => {
		if (userIdOfStatus == currentUser._id) {
			dispatch(deleteStatus(statusId)).then((status) => {
				dispatch(getAllStatus());
			});
		} else {
			dispatch(hideStatus({ statusId, userId })).then((userHide) => {
				dispatch(getAllStatus());
			});
		}
	};
	return (
		<div className="home_statuses">
			{!showSkeleton ? (
				!userId ? (
					statuses
						?.filter((status) => !currentUser?.statusHide.includes(status._id))
						?.map((status, i) => (
							<div className="home_status" key={status?._id}>
								<div className="home_status_top">
									<div className="home_status_top_left">
										<img
											src={status?.user?.avatar ? status?.user?.avatar : avatar}
											className="home_status_top_left_img"
										/>
										<div className="home_status_top_left_info">
											<p className="home_create_p">{status?.user?.username}</p>
											<span className="home_create_span">
												{formatDate(status.createdAt)}
											</span>
										</div>
									</div>
									<div className="home_status_top_right">
										<div className="home_status_top_right_option">
											<BiDotsHorizontalRounded className="home_status_top_right_option_icon" />
										</div>
										<div className="home_status_top_right_option">
											<AiOutlineClose
												className="home_status_top_right_option_icon"
												onClick={() =>
													handleClickDeleteStatus(
														status._id,
														status.user._id,
														currentUser._id
													)
												}
											/>
										</div>
									</div>
								</div>
								<div className="home_status_content">
									<p className="home_status_content_p">{status.text}</p>
									<img src={status.image} className="home_status_content_ing" />
								</div>
								<div className="home_status_bottom">
									<div className="home_status_bottom_top">
										<div className="home_status_emotions">
											<img
												src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"
												className="home_status_emotion"
											/>
											<p>{status.likes.length}</p>
										</div>
										<div className="home_status_opinions">
											{status.comments.length > 0 && (
												<div className="home_status_opinion">
													<BiComment className="home_status_opinion_icon" />
													<p>{status.comments.length}</p>
												</div>
											)}
										</div>
									</div>
									<div className="home_status_options">
										{status.likes.includes(currentUser._id) ? (
											<div
												className="home_status_option"
												onClick={() =>
													handleClickLike(status._id, currentUser._id)
												}
											>
												<AiOutlineLike
													className="home_status_option_icon"
													style={{ color: "#0088ff" }}
												/>
												<p style={{ color: "#0088ff" }}>Thích</p>
											</div>
										) : (
											<div
												className="home_status_option"
												onClick={() =>
													handleClickLike(status._id, currentUser._id)
												}
											>
												<AiOutlineLike className="home_status_option_icon" />
												<p>Thích</p>
											</div>
										)}

										<div className="home_status_option">
											<BiCommentDetail className="home_status_option_icon" />
											<p>Bình luận</p>
										</div>
										<div className="home_status_option">
											<TbShare3 className="home_status_option_icon" />
											<p>Chia sẻ</p>
										</div>
									</div>
									<div className="home_status_comments">
										<div className="comment_create">
											<img
												src={currentUser?.avatar ? currentUser.avatar : avatar}
												className="comment_create_avatar"
											/>
											<div className="comment_create_option">
												{isCreating ? (
													<div class="loading_comment">
														<div></div>
														<div></div>
														<div></div>
													</div>
												) : (
													<>
														<div className="comment_create_bar">
															<input
																placeholder="Viết bình luận..."
																className="comment_create_input"
																onKeyDown={(e) => handleEnter(e, status?._id)}
																value={content}
																onChange={(e) => setContent(e.target.value)}
															/>
														</div>
														<div className="comment_create_icons">
															{content ? (
																<IoMdSend
																	className="comment_create_icon"
																	style={{
																		color: "#2375c9",
																		transition: "all .2s ease-in",
																	}}
																	onClick={() =>
																		handleClickCreateComment(status?._id)
																	}
																/>
															) : (
																<IoMdSend className="comment_create_icon" />
															)}
														</div>
													</>
												)}
											</div>
										</div>
										{status?.comments.map((comment) => (
											<div className="home_status_comment" key={comment._id}>
												<img
													src={
														comment?.user?.avatar
															? comment?.user?.avatar
															: avatar
													}
													className="home_status_comment_avatar"
												/>
												<div className="home_status_comment_center">
													<div className="home_status_comment_option">
														<div className="home_status_comment_center_container">
															<div className="home_status_comment_wrap">
																<p className="home_status_comment_center_name">
																	{comment.user.username}
																</p>
																<p className="home_status_comment_center_p">
																	{comment.content}
																</p>
															</div>

															<div className="home_status_comment_center_bottom">
																<p>{formatDate(comment.createdAt)}</p>
															</div>
														</div>
														<BiDotsHorizontalRounded className="home_status_setting-comment-icon" />
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						))
				) : statuses?.filter((status) => status.user._id === userId).length >
				  0 ? (
					statuses
						?.filter((status) => status.user._id === userId)
						?.map((status, i) => (
							<div className="home_status" key={status?._id}>
								<div className="home_status_top">
									<div className="home_status_top_left">
										<img
											src={status?.user?.avatar ? status?.user?.avatar : avatar}
											className="home_status_top_left_img"
										/>
										<div className="home_status_top_left_info">
											<p className="home_create_p">{status?.user?.username}</p>
											<span className="home_create_span">
												{formatDate(status.createdAt)}
											</span>
										</div>
									</div>
									<div className="home_status_top_right">
										<div className="home_status_top_right_option">
											<BiDotsHorizontalRounded className="home_status_top_right_option_icon" />
										</div>
										<div className="home_status_top_right_option">
											<AiOutlineClose
												className="home_status_top_right_option_icon"
												onClick={() =>
													handleClickDeleteStatus(
														status._id,
														status.user._id,
														currentUser._id
													)
												}
											/>
										</div>
									</div>
								</div>
								<div className="home_status_content">
									<p className="home_status_content_p">{status.text}</p>
									<img src={status.image} className="home_status_content_ing" />
								</div>
								<div className="home_status_bottom">
									<div className="home_status_bottom_top">
										<div className="home_status_emotions">
											<img
												src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"
												className="home_status_emotion"
											/>
											<p>{status.likes.length}</p>
										</div>
										<div className="home_status_opinions">
											{status.comments.length > 0 && (
												<div className="home_status_opinion">
													<BiComment className="home_status_opinion_icon" />
													<p>{status.comments.length}</p>
												</div>
											)}
										</div>
									</div>
									<div className="home_status_options">
										{status.likes.includes(currentUser._id) ? (
											<div
												className="home_status_option"
												onClick={() =>
													handleClickLike(status._id, currentUser._id)
												}
											>
												<AiOutlineLike
													className="home_status_option_icon"
													style={{ color: "#0088ff" }}
												/>
												<p style={{ color: "#0088ff" }}>Thích</p>
											</div>
										) : (
											<div
												className="home_status_option"
												onClick={() =>
													handleClickLike(status._id, currentUser._id)
												}
											>
												<AiOutlineLike className="home_status_option_icon" />
												<p>Thích</p>
											</div>
										)}

										<div className="home_status_option">
											<BiCommentDetail className="home_status_option_icon" />
											<p>Bình luận</p>
										</div>
										<div className="home_status_option">
											<TbShare3 className="home_status_option_icon" />
											<p>Chia sẻ</p>
										</div>
									</div>
									<div className="home_status_comments">
										<div className="comment_create">
											<img
												src={currentUser?.avatar ? currentUser.avatar : avatar}
												className="comment_create_avatar"
											/>
											<div className="comment_create_option">
												<div className="comment_create_bar">
													<input
														placeholder="Viết bình luận..."
														className="comment_create_input"
														onKeyDown={(e) => handleEnter(e, status?._id)}
														value={content}
														onChange={(e) => setContent(e.target.value)}
													/>
												</div>
												<div className="comment_create_icons">
													{content ? (
														<IoMdSend
															className="comment_create_icon"
															style={{
																color: "#2375c9",
																transition: "all .2s ease-in",
															}}
															onClick={() =>
																handleClickCreateComment(status?._id)
															}
														/>
													) : (
														<IoMdSend className="comment_create_icon" />
													)}
												</div>
											</div>
										</div>
										{status?.comments.map((comment) => (
											<div className="home_status_comment" key={comment._id}>
												<img
													src={
														comment?.user?.avatar
															? comment?.user?.avatar
															: avatar
													}
													className="home_status_comment_avatar"
												/>
												<div className="home_status_comment_center">
													<div className="home_status_comment_option">
														<div className="home_status_comment_center_container">
															<div className="home_status_comment_wrap">
																<p className="home_status_comment_center_name">
																	{comment.user.username}
																</p>
																<p className="home_status_comment_center_p">
																	{comment.content}
																</p>
															</div>

															<div className="home_status_comment_center_bottom">
																<p>{formatDate(comment.createdAt)}</p>
															</div>
														</div>
														<BiDotsHorizontalRounded className="home_status_setting-comment-icon" />
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						))
				) : (
					<div className="profile_null">
						<p className="profile_null_p">
							{userProfile?.username} hiện không có bài post nào
						</p>
					</div>
				)
			) : (
				<Facebook
					speed={0.9}
					foregroundColor="#b1b3b9"
					style={{
						height: "200px",
						backgroundColor: "#242526",
						width: "680px",
						color: "blue",
					}}
				/>
			)}
		</div>
	);
};

export default Status;
