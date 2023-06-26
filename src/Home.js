import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
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
import avatar from "./assets/images/avatar-mac-dinh.jpeg";
import qc1 from "./assets/images/qc1.jpeg";
import qc2 from "./assets/images/qc2.jpeg";
import ShortsSlider from "./components/ShortsSlider";
import Reels from "./components/Reels";
import Status from "./components/Status";
import { createStatus } from "./actions/status/createStatus";
import { getAllStatus } from "./actions/status/getAllStatus";
import { fetchAllUsers } from "./actions/user/fetchAllUsers";
import ChatBox from "./components/ChatBox";
import { getSocket } from "./socket";

const Home = () => {
	const socket = getSocket();
	const fileRef = useRef();
	const dispatch = useDispatch();
	const [chat, setChat] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [isReels, setIsReels] = useState(false);
	const [text, setText] = useState("");
	const [image, setImage] = useState("");
	const { currentUser } = useSelector((state) => state.user.auth);
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	useEffect(() => {
		dispatch(fetchAllUsers());

		// socket.on("loginSuccess", () => {
		// 	dispatch(fetchAllUsers());
		// });
		// socket.on("disconnectSucces", () => {
		// 	dispatch(fetchAllUsers());
		// });
	}, [socket]);
	socket.on("loginSuccess", () => {
		dispatch(fetchAllUsers());
	});
	socket.on("disconnectSuccess", () => {
		dispatch(fetchAllUsers());
	});
	const HandleClickStory = () => {
		setIsReels(false);
	};

	const HandleClickReels = () => {
		setIsReels(true);
	};
	const handleClickFile = () => {
		fileRef.current.click();
	};
	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			const img = new Image();
			img.src = reader.result;

			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				// Calculate the new width and height
				const MAX_WIDTH = 400;
				const MAX_HEIGHT = 400;
				let width = img.width;
				let height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}

				// Resize the image using the canvas
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);

				// Convert the canvas back to a data URL
				const imageType = "image/jpeg";
				const dataURL = canvas.toDataURL(imageType);
				setImage(dataURL);
			};
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};
	const handleEnter = async (e) => {
		let user = await currentUser._id;
		if (text) {
			if (e.key === "Enter") {
				dispatch(createStatus({ text, image, user })).then((status) => {
					dispatch(getAllStatus());
					setText("");
					setImage("");
				});
			}
		}
	};
	const handleClickFriend = (friend) => {
		setSelectedFriend(friend);
		setChat(true);
	};
	return (
		<div className="container">
			<Header />
			<div className="home">
				<div className="home_left">
					<Link
						to={`/profile/${currentUser._id}`}
						className="home_left_option"
						style={{ textDecoration: "none" }}
					>
						<img
							src={
								users?.find((user) => user._id === currentUser._id).avatar ||
								avatar
							}
							className="home_left_option_avatar"
						/>

						<p>{currentUser.username}</p>
					</Link>
					<div className="home_left_option">
						<FaUserFriends className="home_left_pro" />
						<p>Bạn bè</p>
					</div>
					<div className="home_left_option">
						<MdSmartDisplay className="home_left_pro" />
						<p>Watch</p>
					</div>
					<div className="home_left_option">
						<AiFillShop className="home_left_pro" />
						<p>Marketplace</p>
					</div>
					<div className="home_left_option">
						<BsMessenger className="home_left_pro" />
						<p>Messenger</p>
					</div>
					<footer>@SangHuynh</footer>
				</div>
				<div className="home_center">
					<div className="home_shorts">
						<div className="home_shorts_top">
							<div
								className={`home_shorts_top_option ${!isReels && "active"}`}
								onClick={() => HandleClickStory()}
							>
								<BsBookFill className="story_icon" />
								<span className="home_shorts_top_option_p">Tin</span>
							</div>
							<div
								className={`home_shorts_top_option ${isReels && "active"}`}
								onClick={() => HandleClickReels()}
							>
								<BsPlayCircleFill className="story_icon" />
								<span className="home_shorts_top_option_p">Reels</span>
							</div>
						</div>
						{isReels ? <Reels /> : <ShortsSlider />}
					</div>
					<div className="home_create">
						<div className="home_create_top">
							<img
								src={currentUser?.avatar ? currentUser.avatar : avatar}
								className="home_create_top_img"
							/>
							<div className="home_create_top_bar">
								<input
									placeholder="Sang ơi, bạn đang nghĩ gì thế?"
									className="home_create_top_input"
									value={text}
									onChange={(e) => setText(e.target.value)}
									onKeyDown={(e) => handleEnter(e)}
								/>
							</div>
						</div>
						<div className="home_create_bottom">
							<div
								className="home_create_option"
								onClick={() => handleClickFile()}
							>
								<AiFillPicture className="home_create_option_icon photo" />
								<p>Ảnh/video</p>
								<input
									type="file"
									style={{ display: "none" }}
									ref={fileRef}
									onChange={(e) => handleFileUpload(e)}
								/>
							</div>
							{image && (
								<>
									<IoIosCloseCircleOutline
										style={{
											color: "#fff",
											fontSize: "30px",
											cursor: "pointer",
										}}
										onClick={() => setImage("")}
									/>
									<img src={image} className="home_create_bottom_img" />
								</>
							)}
						</div>
					</div>
					<Status />
				</div>
				<div className="home_right">
					<div className="home_right_qc">
						<div className="home_right_qc_option">
							<img src={qc1} className="qc_img" />
							<p>thinkpro.vn</p>
						</div>
						<div className="home_right_qc_option">
							<img src={qc2} className="qc_img" />
							<p>daesang.vn</p>
						</div>
					</div>
					<div className="home_right_content">
						<p className="home_right_title">Người liên hệ</p>
						{users
							?.filter((user) => user._id !== currentUser._id)
							.map((user, i) => (
								<>
									<div
										className={
											user.online
												? "home_right_friend online"
												: "home_right_friend"
										}
										key={user._id}
										onClick={() => handleClickFriend(user)}
									>
										<div className="home_right_friend_avatar">
											<img
												src={user?.avatar ? user.avatar : avatar}
												className="home_right_friend_img"
											/>
										</div>
										<p>{user.username}</p>
									</div>
									{chat && (
										<ChatBox
											setChat={setChat}
											friend={selectedFriend}
											setSelectedFriend={setSelectedFriend}
										/>
									)}
								</>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
