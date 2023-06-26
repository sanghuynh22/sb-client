import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { addFriend } from "../actions/user/addFriend";
import { deleteRequestFriend } from "../actions/user/deleteRequestAdd";
export const FriendsSuggest = () => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	const { currentUser } = useSelector((state) => state.user.auth);
	useEffect(() => {
		dispatch(fetchAllUsers());
	}, []);
	const mutualFriendSuggest = useMemo(() => {
		if (!currentUser || !users) return [];
		let currentUserAccess = users.find((user) => user._id === currentUser._id);
		const currentUserFriendIds = [
			...currentUserAccess.friends.map((friend) => friend._id),
			...currentUserAccess.friendRequest.map((request) => request._id),
		];

		const newUsers = users?.filter(
			(user) =>
				!currentUserFriendIds.includes(user._id) && user._id !== currentUser._id
		);

		const usersWithMutualFriends = newUsers.map((user) => {
			const mutualFriends = user.friends?.filter((friend) =>
				currentUserAccess?.friends?.some(
					(currentUserFriend) => currentUserFriend._id === friend._id
				)
			);
			return { ...user, mutualFriends };
		});

		return usersWithMutualFriends?.sort((a, b) => {
			return b.mutualFriends?.length - a.mutualFriends?.length;
		});
	}, [currentUser, users]);
	const handleClickAddFriend = (friendId) => {
		dispatch(
			addFriend({ userRequest: currentUser._id, userReceive: friendId })
		).then((res) => {
			dispatch(fetchAllUsers());
		});
	};
	const handleClickDenyFriend = (friendId) => {
		dispatch(
			deleteRequestFriend({
				userId: currentUser._id,
				friendUserId: friendId,
			})
		).then((res) => {
			dispatch(fetchAllUsers());
		});
	};
	return (
		<div className="friends_requests">
			<div className="friends_request_info">
				<p className="friends_request_title">Những người bạn có thể biết</p>
			</div>
			<div className="friend_request_container">
				{mutualFriendSuggest.map((user, i) => (
					<div className="friend_request" key={user._id}>
						<div className="friend_request_info_container">
							<img src={user.avatar || avatar} className="friend_request_img" />
							<p className="friend_request_p">{user.username}</p>
							{user?.mutualFriends?.length > 0 && (
								<p className="friend_request_mutual_amount">
									{user.mutualFriends.length} bạn chung
								</p>
							)}
						</div>

						<div className="friend_request_buttons">
							{user.friendReceiveRequest.includes(currentUser._id) ? (
								<div
									style={{ backgroundColor: "#3a3b3c" }}
									className="friend_request_accept"
									onClick={() => handleClickDenyFriend(user._id)}
								>
									<p className="friend_request_accept_p">Đã gửi lời mởi</p>
								</div>
							) : (
								<div
									className="friend_request_accept"
									onClick={() => handleClickAddFriend(user._id)}
								>
									<p className="friend_request_accept_p">Thêm bạn bè</p>
								</div>
							)}

							<div className="friend_request_deny">
								<p className="friend_request_deny_p">Xóa</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
