import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../actions/market/createItem";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { formatNumber } from "../formatNumber/formatNumber";
import numeral from "numeral";

const MarketCreate = ({ setIsCreate }) => {
	numeral.defaultFormat("0.0.[0000]");
	const selectRef = useRef();
	const fileRef = useRef();
	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [amount, setAmount] = useState("");
	const [image, setImage] = useState("");
	const { currentUser } = useSelector((state) => state.user.auth);

	const handleChangeTag = (e) => {
		setSelectedOption(e.target.value);
	};
	const handleClickFile = () => {
		fileRef.current.click();
	};
	const handleUploadFile = async (event) => {
		const file = await event.target.files[0];

		if (!file) return;
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
	const handleClickCreate = () => {
		if (
			!title ||
			!description ||
			!price ||
			!amount ||
			!image ||
			!selectedOption
		) {
			alert("Bạn cần nhập đầy đủ nội dung");
		} else {
			dispatch(
				createItem({
					title: title,
					seller: currentUser._id,
					image: image,
					description: description,
					price: price,
					amount: amount,
					tag: selectedOption,
				})
			).then((res) => {
				alert(`Đã tạo thành công sản phẩm ${title}`);
				setTitle("");
				setImage("");
				setDescription("");
				setAmount("");
				setPrice("");
				setSelectedOption("");
				selectRef.current.selectedIndex = 0;
			});
		}
	};
	const handleClickOutCreateItem = () => {
		setIsCreate(false);
	};
	return (
		<div className="marketcreate">
			<div className="marketcreate_left">
				<div className="storyCreate_top">
					<div
						className="storyCreate_out_container"
						onClick={() => handleClickOutCreateItem()}
					>
						<AiOutlineClose className="storyCreate_out" />
					</div>
					<Link to="/">
						<img src={logo} className="logo" />
					</Link>
				</div>
				<div className="marketcreate_left_option">
					<div
						className="marketcreate_left_image"
						onClick={() => handleClickFile()}
					>
						{image ? (
							<img src={image} className="marketcreate_img" />
						) : (
							<div className="marketcreate_left_img">
								<div className="marketcreate_left_image_icons">
									<RiImageAddFill className="marketcreate_left_image_icon" />
								</div>
								<p className="marketcreate_left_p">Thêm ảnh</p>
							</div>
						)}
					</div>
					<input
						type="file"
						style={{ display: "none" }}
						ref={fileRef}
						onChange={(e) => handleUploadFile(e)}
					/>
				</div>
				<p className="marketcreate_left_p">Thông tin sản phẩm :</p>
				<div className="marketcreate_left_info">
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="marketcreate_left_input"
					/>
				</div>
				<div className="marketcreate_left_info">
					<textarea
						type="text"
						placeholder="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="marketcreate_left_areatext"
					/>
				</div>
				<div className="marketcreate_left_info">
					<input
						type="number"
						placeholder="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="marketcreate_left_input"
					/>
				</div>

				<div className="marketcreate_left_info">
					<input
						type="number"
						placeholder="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="marketcreate_left_input"
					/>
				</div>
				<div className="marketcreate_left_info">
					<select
						onChange={(e) => handleChangeTag(e)}
						ref={selectRef}
						className={
							selectedOption
								? "marketcreate_left_select active"
								: "marketcreate_left_select"
						}
					>
						<option
							disabled
							selected
							className="marketcreate_left_first_option"
						>
							Chọn tag
						</option>

						<option value="phone" style={{ color: "#fff" }}>
							Điện thoại
						</option>
						<option value="laptop">Laptop</option>
						<option value="family">Gia đình</option>
						<option value="electric">Điện tử</option>
						<option value="music">Nhạc cụ</option>
					</select>
				</div>
				<div
					className="marketcreate_create_button"
					onClick={() => handleClickCreate()}
				>
					<p className="marketcreate_create_p">Tạo sản phẩm</p>
				</div>
			</div>
			<div className="marketcreate_right">
				<div className="marketcreate_right_container">
					<div className="marketcreate_right_left">
						{image ? (
							<img src={image} className="marketcreate_right_left_img" />
						) : (
							<p className="marketcreate_right_left_p">
								Hình ảnh sản phẩm hiện ở đây
							</p>
						)}
					</div>
					<div className="marketcreate_right_info">
						{title ? (
							<p className="market_info_title">{title}</p>
						) : (
							<p className="market_info_title">Tiêu đề</p>
						)}
						{price ? (
							<p className="market_info_price">{formatNumber(price)}</p>
						) : (
							<p className="market_info_price">Giá</p>
						)}
						{description ? (
							<p className="market_info_price">{description}</p>
						) : (
							<p className="market_info_price">Mô tả</p>
						)}
						<div className="line_market"></div>
						<p className="marketcreate_info_seller">Thông tin người bán</p>
						<div className="marketcreate_info_user">
							<img
								src={currentUser.avatar || avatar}
								className="marketcreate_info_avatar"
							/>
							<p className="marketcreate_info_user_p">{currentUser.username}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarketCreate;
