import React, { useState, useRef } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useNavigate,
} from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import Header from "./Header";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { TiSortAlphabetically } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { createStory } from "../actions/story/createStory";
const StoryCreate = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileRef = useRef();
	const videoRef = useRef();
	const colors = [
		"#4182ea",
		"#1877f2",
		"#00a400",
		"#ffcc00",
		"#3f729b",
		"#c32aa3",
		"orange",
		"yellow",
	];
	const { currentUser } = useSelector((state) => state.user.auth);
	const [text, setText] = useState("");
	const [background, setBackground] = useState("#4182ea");
	const [isCreateImage, setIsCreateImage] = useState(false);
	const [isCreateVideo, setIsCreateVideo] = useState(false);
	const [videoFile, setVideoFile] = useState(null);
	const [videoString, setVideoString] = useState("");
	const [image, setImage] = useState("");
	const handleClickOutCreateStory = () => {
		if (isCreateImage) {
			setIsCreateImage(false);
		} else if (isCreateVideo) {
			setIsCreateVideo(false);
		} else if (!isCreateImage && !isCreateVideo) {
			navigate("/");
		}
	};
	const handleClickColor = (color) => {
		setBackground(color);
	};
	const handleClickFile = () => {
		fileRef.current.click();
	};
	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		if (file.type.startsWith("video")) {
			setImage("");
			setVideoFile(file);
			const reader = new FileReader();

			reader.onload = () => {
				const result = reader.result;

				setVideoString(result);

				// videoRef.current.src = result;
			};

			reader.readAsDataURL(file);
		} else {
			setVideoFile(null);
			setVideoString("");
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
		}
	};

	const handleClickCreateStory = () => {
		if (isCreateImage) {
			if (text) {
				dispatch(
					createStory({
						user: currentUser._id,
						text,
						backgroundColor: background,
						type: "text",
					})
				).then((story) => {
					alert(`story với nội dung: ${text} đã được tạo`);
					setText("");
				});
			}
		} else {
			if (videoString) {
				alert("Không thể tạo story dạng video do database khong đủ sức chứa!");
				// dispatch(
				// 	createStory({
				// 		user: currentUser._id,
				// 		src: videoString,
				// 		type: "video",
				// 	})
				// ).then((story) => {
				// });
			} else if (image) {
				dispatch(
					createStory({
						user: currentUser._id,
						src: image,
						type: "image",
					})
				).then((story) => {
					alert(`story đã được tạo`);
				});
			}
		}
	};
	const handleLoadedMetadata = () => {
		// Lấy thời lượng của video
		const duration = videoRef.current.duration;

		// Kiểm tra điều kiện
		if (duration > 60) {
			alert("Chỉ được upload video có độ dài trong 5 phút.");
			// Xóa file video khỏi state
			setVideoFile(null);
			setVideoString("");
		}
	};
	return (
		<>
			<div className="story_left">
				<div className="storyCreate_top">
					<div
						className="storyCreate_out_container"
						onClick={() => handleClickOutCreateStory()}
					>
						<AiOutlineClose className="storyCreate_out" />
					</div>
					<Link to="/">
						<img src={logo} className="logo" />
					</Link>
				</div>
				{isCreateImage && (
					<div className="storyCreate_left_content">
						<textarea
							placeholder="Nhập nội dung ở đây"
							className="storyCreate_text"
							rows="4"
							cols="50"
							value={text}
							onChange={(e) => setText(e.target.value)}
						>
							Nhập văn bản vào đây.
						</textarea>
						<div class="storyCreate_background">
							{colors.map((color, i) => (
								<div
									key={i}
									className={`storyCreate_card_color ${
										background === color ? "active" : ""
									}`}
									style={{ backgroundColor: color }}
									onClick={() => handleClickColor(color)}
								></div>
							))}
						</div>
						<div className="storyCreate_buttons">
							<div
								className="storyCreate_button_right"
								onClick={() => handleClickCreateStory()}
							>
								<p className="storyCreate_button_p">Tạo story</p>
							</div>
						</div>
					</div>
				)}
				{isCreateVideo && (
					<div className="storyCreate_left_content">
						<div className="storyCreate_file" onClick={() => handleClickFile()}>
							<p className="storyCreate_file_p"> Hình ảnh/Video </p>
							<input
								type="file"
								style={{ display: "none" }}
								ref={fileRef}
								accept="image/*,video/*"
								onLoadedMetadata={handleLoadedMetadata}
								onChange={(e) => handleFileUpload(e)}
							/>
						</div>
						<div className="storyCreate_buttons">
							<div
								className="storyCreate_button_right"
								onClick={() => handleClickCreateStory()}
							>
								<p className="storyCreate_button_p">Tạo story</p>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="story_center">
				{!isCreateImage && !isCreateVideo && (
					<>
						<div
							className="storyCreate_card"
							onClick={() => setIsCreateVideo(!isCreateVideo)}
						>
							<div className="storyCreate_icons">
								<HiOutlinePhotograph className="storyCreate_icon" />
							</div>
							<p className="storyCreate_p">Tạo tin ảnh</p>
						</div>
						<div
							className="storyCreate_card"
							onClick={() => setIsCreateImage(!isCreateImage)}
						>
							<div className="storyCreate_icons">
								<TiSortAlphabetically className="storyCreate_icon" />
							</div>
							<p className="storyCreate_p">Tạo tin bằng chữ</p>
						</div>
					</>
				)}
				{isCreateImage && (
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
				)}
				{isCreateVideo && (
					<div className="storyCreate_img_container">
						<div className="storyCreate_img_titlr_container">
							<p className="storyCreate_img_title">Xem trước</p>
						</div>
						<div className="storyCreate_img_content video">
							{image && <img src={image} className="storyCreate_img" />}
							{videoString && (
								<video
									src={videoString}
									className="storyCreate_video"
									ref={videoRef}
									onLoadedMetadata={handleLoadedMetadata}
									controls
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default StoryCreate;
