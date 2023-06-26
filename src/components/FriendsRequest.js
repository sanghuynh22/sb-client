import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { useNavigate } from "react-router-dom";
import { deleteRequestFriend } from "../actions/user/deleteRequestAdd";
import { acceptRequestFriend } from "../actions/user/acceptRequest";
export const FriendsRequest = ({ isRequest }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	const { currentUser } = useSelector((state) => state.user.auth);
	useEffect(() => {
		dispatch(fetchAllUsers());
	}, []);
	const handleClickAvatar = (userId) => {
		navigate(`/profile/${userId}`);
	};
	const handleClickDenyRequest = (friendId) => {
		dispatch(
			deleteRequestFriend({ userId: currentUser._id, friendUserId: friendId })
		).then((res) => dispatch(fetchAllUsers()));
	};
	const handleClickAcceptFriend = (friendId) => {
		dispatch(
			acceptRequestFriend({
				userId: currentUser._id,
				friendId: friendId,
			})
		).then((res) => dispatch(fetchAllUsers()));
	};
	return (
		<div className="friends_requests">
			<div className="friends_request_info">
				<p className="friends_request_title">Lời mời kết bạn</p>
			</div>

			<div className="friend_request_container">
				{users?.find((user) => user._id === currentUser._id)
					.friendReceiveRequest.length > 0 ? (
					users
						?.find((user) => user._id === currentUser._id)
						.friendReceiveRequest.map((user, i) => (
							<div className="friend_request" key={user._id}>
								<img
									src={user.avatar || avatar}
									className="friend_request_img"
									onClick={() => handleClickAvatar(user._id)}
								/>
								<p className="friend_request_p">{user.username}</p>
								<div className="friend_request_buttons"></div>
								<div
									className="friend_request_accept"
									onClick={() => handleClickAcceptFriend(user._id)}
								>
									<p className="friend_request_accept_p">Xác nhận</p>
								</div>
								<div
									className="friend_request_deny"
									onClick={() => handleClickDenyRequest(user._id)}
								>
									<p className="friend_request_deny_p">Xóa</p>
								</div>
							</div>
						))
				) : (
					<div className="friend_request_none">
						<p className="friend_request_none_p">Hiện không có lời mời nào</p>
					</div>
				)}
			</div>
		</div>
	);
};
