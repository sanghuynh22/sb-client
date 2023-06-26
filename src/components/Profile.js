import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatus } from "../actions/status/getAllStatus";
import { useParams } from "react-router-dom";
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
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { formatDate } from "../time/formatTime";
import Header from "./Header";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import { deleteFriend } from "../actions/user/deleteFriend";
import { deleteRequestFriend } from "../actions/user/deleteRequestAdd";
import { addFriend } from "../actions/user/addFriend";
import { acceptRequestFriend } from "../actions/user/acceptRequest";
import Status from "./Status";
import { updateUser } from "../actions/user/updateUser";
const Profile = () => {
	const dispatch = useDispatch();
	const refFile = useRef();
	let { userId } = useParams();
	const [content, setContent] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [isUpdated, setIsUpdated] = useState(false);
	const [isUploadImage, setIsUploadImage] = useState(false);
	const { currentUser } = useSelector((state) => state.user.auth);
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	const { statuses } = useSelector((state) => state.status.getAllStatus);
	const userLogin = useMemo(() => {
		return users.find((user) => user._id === currentUser._id);
	}, [
		currentUser,
		userId,
		users,
		dispatch,
		statuses,
		addFriend,
		deleteFriend,
		deleteRequestFriend,
		acceptRequestFriend,
		fetchAllUsers,
	]);
	const userProfile = useMemo(() => {
		return users?.find((user) => user._id === userId);
	}, [
		currentUser,
		userId,
		users,
		dispatch,
		statuses,
		addFriend,
		deleteFriend,
		deleteRequestFriend,
		fetchAllUsers,
	]);
	useEffect(() => {
		dispatch(getAllStatus());
		dispatch(fetchAllUsers());
	}, []);
	const handleClickAddFriend = () => {
		dispatch(
			addFriend({ userRequest: currentUser._id, userReceive: userProfile._id })
		).then((res) => {
			dispatch(fetchAllUsers());
		});
	};
	const handleClickAcceptFriend = () => {
		dispatch(
			acceptRequestFriend({
				userId: currentUser._id,
				friendId: userProfile._id,
			})
		);
	};
	const handleClickDeleteFriend = () => {
		dispatch(
			deleteFriend({ userId: currentUser._id, friendId: userProfile._id })
		).then((res) => {
			dispatch(fetchAllUsers());
		});
	};
	const handleClickDeleteRequest = () => {
		dispatch(
			deleteRequestFriend({
				userId: currentUser._id,
				friendUserId: userProfile._id,
			})
		).then((res) => {
			dispatch(fetchAllUsers());
		});
	};
	const handleClickChangeAvatar = () => {
		refFile.current.click();
	};
	const handleChangeImage = async (e) => {
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
				setIsUploadImage(true);
				setSelectedImage(dataURL);
			};
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};
	const handleClickUpdateUserAvatar = () => {
		dispatch(
			updateUser({ userId: currentUser._id, avatar: selectedImage })
		).then((res) => {
			setIsUploadImage(false);
			dispatch(fetchAllUsers());
		});
	};
	const handleClickHuy = () => {
		URL.revokeObjectURL(selectedImage);
		refFile.current.value = "";
		setSelectedImage(null);
	};
	return (
		<>
			<Header avatarUpload={selectedImage} />
			<div className="profile">
				<div className="profile_top">
					<div className="profile_info">
						<img
							src={selectedImage ? selectedImage : userProfile.avatar || avatar}
							className="profile_info_img"
						/>
						<div className="profile_info_ps">
							<p className="profile_info_p">{userProfile?.username}</p>
							<p className="profile_info_friends">
								{`${userProfile?.friends?.length} bạn bè` || "0 bạn bè"}
							</p>
						</div>
					</div>
					<div className="profile_options">
						{userProfile._id !== userLogin._id ? (
							userProfile?.friends?.includes(userLogin._id) ? (
								<div
									style={{ backgroundColor: "#3a3b3c" }}
									className="profile_option"
									onClick={() => handleClickDeleteFriend()}
								>
									<p className="profile_option_p">Xóa kết bạn</p>
								</div>
							) : userLogin.friendRequest.includes(userProfile._id) ? (
								<div
									style={{ backgroundColor: "#3a3b3c" }}
									className="profile_option"
									onClick={() => handleClickDeleteRequest()}
								>
									<p className="profile_option_p">Xóa lời mời kết bạn</p>
								</div>
							) : userLogin.friendReceiveRequest.includes(userProfile._id) ? (
								<div
									className="profile_option"
									onClick={() => handleClickAcceptFriend()}
								>
									<p className="profile_option_p">Đồng ý kết bạn</p>
								</div>
							) : !userLogin.friends.includes(userProfile._id) ? (
								<div
									style={{ backgroundColor: "#3a3b3c" }}
									className="profile_option"
									onClick={() => alert("Không xóa bạn bè được!")}
								>
									<p className="profile_option_p">Bạn bè</p>
								</div>
							) : (
								<div
									className="profile_option"
									onClick={() => handleClickAddFriend()}
								>
									<p className="profile_option_p">Thêm bạn +</p>
								</div>
							)
						) : (
							<></>
						)}
						{userProfile._id === currentUser._id && isUploadImage ? (
							<>
								<div
									className="profile_option"
									style={{ backgroundColor: "#3a3b3c" }}
									onClick={() => handleClickUpdateUserAvatar()}
								>
									<p className="profile_option_p">Lưu</p>
								</div>
								<div
									className="profile_option"
									style={{ backgroundColor: "#3a3b3c" }}
									onClick={() => handleClickHuy()}
								>
									<p className="profile_option_p">Hủy</p>
								</div>
							</>
						) : (
							<div
								className="profile_option"
								style={{ backgroundColor: "#3a3b3c" }}
								onClick={() => handleClickChangeAvatar()}
							>
								<p className="profile_option_p">Thay đổi avatar</p>
							</div>
						)}
						<input
							type="file"
							ref={refFile}
							style={{ display: "none" }}
							onChange={(e) => handleChangeImage(e)}
						/>
					</div>
				</div>
				<Status userProfile={userProfile} />
			</div>
		</>
	);
};

export default Profile;
