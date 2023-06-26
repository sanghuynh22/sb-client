import React, { useState } from "react";
import Header from "./components/Header";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import {
	BsFillPersonPlusFill,
	BsFillPersonCheckFill,
	BsFillPersonLinesFill,
} from "react-icons/bs";
import { FriendsRequest } from "./components/FriendsRequest";
import { FriendsSuggest } from "./components/FriendsSuggest";
import FriendsAll from "./components/FriendsAll";

const Friends = () => {
	const [isHome, setIsHome] = useState(true);
	const [isRequest, setIsRequest] = useState(false);
	const [isSuggest, setIsSuggest] = useState(false);
	const [isFriends, setIsFriends] = useState(false);
	const handleClickTrangchu = () => {
		setIsHome(true);
		setIsFriends(false);
		setIsRequest(false);
		setIsSuggest(false);
	};
	const handleClickRequest = () => {
		setIsHome(false);
		setIsFriends(false);
		setIsRequest(true);
		setIsSuggest(false);
	};
	const handleClickSuggest = () => {
		setIsHome(false);
		setIsFriends(false);
		setIsRequest(false);
		setIsSuggest(true);
	};
	const handleClickFriends = () => {
		setIsHome(false);
		setIsFriends(true);
		setIsRequest(false);
		setIsSuggest(false);
	};
	return (
		<div className="container">
			<Header />
			<div className="friends">
				<div className="friends_left">
					<p className="friends_left_title">Bạn bè</p>

					<div
						className={`friends_left_option ${isHome && "active"}`}
						onClick={() => handleClickTrangchu()}
					>
						<div className="friends_left_icons">
							<FaUserFriends className="friends_left_icon" />
						</div>
						<p className="friends_left_p">Trang chủ</p>
					</div>
					<div
						className={`friends_left_option ${isRequest && "active"}`}
						onClick={() => handleClickRequest()}
					>
						<div className="friends_left_icons">
							<BsFillPersonCheckFill className="friends_left_icon" />
						</div>
						<p className="friends_left_p">Lời mời kết bạn</p>
						<IoIosArrowForward className="friends_left_arrow" />
					</div>
					<div
						className={`friends_left_option ${isSuggest && "active"}`}
						onClick={() => handleClickSuggest()}
					>
						<div className="friends_left_icons">
							<BsFillPersonPlusFill className="friends_left_icon" />
						</div>
						<p className="friends_left_p">Gợi ý</p>
						<IoIosArrowForward className="friends_left_arrow" />
					</div>
					<div
						className={`friends_left_option ${isFriends && "active"}`}
						onClick={() => handleClickFriends()}
					>
						<div className="friends_left_icons">
							<BsFillPersonLinesFill className="friends_left_icon" />
						</div>
						<p className="friends_left_p">Tất cả bạn bè</p>
						<IoIosArrowForward className="friends_left_arrow" />
					</div>
				</div>
				<div className="friends_center">
					{!isRequest && !isFriends && !isSuggest ? (
						<>
							<FriendsRequest />
							<FriendsSuggest />
						</>
					) : isRequest ? (
						<FriendsRequest />
					) : isFriends ? (
						<FriendsAll />
					) : (
						isSuggest && <FriendsSuggest />
					)}
				</div>
			</div>
		</div>
	);
};

export default Friends;
