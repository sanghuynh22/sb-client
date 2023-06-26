import React from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { useNavigate } from "react-router-dom";

const FriendsAll = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	const { currentUser } = useSelector((state) => state.user.auth);

	const handleClickAvatar = (userId) => {
		navigate(`/profile/${userId}`);
	};
	return (
		<div className="friends_requests">
			<div className="friends_request_info">
				<p className="friends_request_title">Tất cả bạn bè</p>
			</div>

			<div className="friend_request_container">
				{users?.find((user) => user._id === currentUser._id).friends.length >
				0 ? (
					users
						?.find((user) => user._id === currentUser._id)
						.friends.map((user, i) => (
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
									style={{ backgroundColor: "#3a3b3c" }}
								>
									<p className="friend_request_accept_p">Bạn bè</p>
								</div>
								<div className="friend_request_deny">
									<p className="friend_request_deny_p">Xóa kết bạn</p>
								</div>
							</div>
						))
				) : (
					<div className="friend_request_none">
						<p className="friend_request_none_p">Hiện bạn chưa có bạn bè</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendsAll;
