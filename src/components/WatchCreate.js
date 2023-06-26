import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { createWatch } from "../actions/watch/createWatch";

const WatchCreate = ({ setIsCreate }) => {
	const dispatch = useDispatch();
	const fileRef = useRef();
	const { currentUser } = useSelector((state) => state.user.auth);

	const [title, setTitle] = useState("");
	const [fileReview, setFileReview] = useState(null);
	const [file, setFile] = useState(null);

	const handleClickFile = (e) => {
		fileRef.current.click();
	};
	const handleUploadFile = (e) => {
		const fileBuffer = e.target.files[0];
		setFile(fileBuffer);

		const reader = new FileReader();
		reader.readAsDataURL(fileBuffer);
		reader.onload = () => {
			setFileReview(reader.result);
		};
	};
	const handleClickCreate = () => {
		if (!title) {
			alert("Bạn vẫn chưa nhập nội dung video!");
		} else if (!file) {
			alert("Tải lên file video trước khi tạo");
		} else {
			dispatch(
				createWatch({ title: title, user: currentUser._id, file: file })
			).then((res) => alert(`Đã tạo thành công Watch với video ${file.name}`));
		}
	};
	return (
		<div className="watchcreate" onClick={() => setIsCreate(false)}>
			<div
				className="watchcreate_container"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="watchcreate_close" onClick={() => setIsCreate(false)}>
					<IoMdClose className="watchcreate_close_icon" />
				</div>
				<div className="watchcreate_option">
					<p className="watchcreate_title">Title</p>
					<div className="watchcreate_option_text">
						<input
							type="text"
							className="watchcreate_option_input"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<div className="watchcreate_option">
					<p className="watchcreate_title">video</p>
					<div
						className="watchcreate_video"
						onClick={(e) => handleClickFile(e)}
					>
						<p className="watchcreate_video_p">Tải video vào đây</p>
					</div>
					<input
						type="file"
						style={{ display: "none" }}
						ref={fileRef}
						onChange={(e) => handleUploadFile(e)}
					/>
					{fileReview && (
						<video controls src={fileReview} class="watchcreate_video_src" />
					)}
				</div>
				<div class="watchcreate_create" onClick={() => handleClickCreate()}>
					<p>Tạo watch</p>
				</div>
			</div>
		</div>
	);
};

export default WatchCreate;
