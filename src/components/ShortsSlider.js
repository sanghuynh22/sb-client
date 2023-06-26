import { useState, useRef, useEffect } from "react";
import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";

function ShortsSlider() {
	const dispatch = useDispatch();
	const shorts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const containerRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const { currentUser } = useSelector((state) => state.user.auth);
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	useEffect(() => {
		dispatch(fetchAllUsers()).then((users) => {});
	}, []);
	const handleNextClick = () => {
		const newIndex = Math.min(activeIndex + 5, shorts.length - 1);
		setActiveIndex(newIndex);
		scrollToIndex(newIndex);
	};

	const handlePrevClick = () => {
		const newIndex = Math.max(activeIndex - 5, 0);
		setActiveIndex(newIndex);
		scrollToIndex(newIndex);
	};

	const scrollToIndex = (index) => {
		const container = containerRef.current;
		container.scrollTo({
			left: container.offsetWidth * index,
			behavior: "smooth",
		});
	};

	return (
		<>
			{/* <div className="shorts_slider_content_container" ref={containerRef}> */}
			<div className="home_shorts_content" ref={containerRef}>
				<Link to={"/story"} className="home_shorts_content_option">
					<img
						src={currentUser.avatar || avatar}
						className="home_shorts_content_img"
					/>
					<div className="home_shorts_content_create">
						<AiOutlinePlus className="home_shorts_content_create_icon" />
					</div>
					<p className="shorts_content_p">Tạo tin</p>
					<div className="home_shorts_content_hidden"></div>
				</Link>
				{users
					?.filter((user) => user.stories.length !== 0)
					.sort((a, b) => {
						if (a._id === currentUser?._id) return -1;
						if (b._id === currentUser?._id) return 1;
						return 0;
					})
					.map((user, i) => {
						return (
							<Link
								to={`/story/${user._id}`}
								className="home_shorts_content_option"
								key={user._id}
							>
								{user.stories[0].type == "text" ? (
									<div
										className="home_shorts_tyoe_text"
										style={{
											backgroundColor: `${user.stories[0].backgroundColor}`,
										}}
									>
										<p>{user.stories[0].text}</p>
									</div>
								) : (
									<img
										src={user.stories[0].src}
										className="home_shorts_content_img"
									/>
								)}
								<div className="home_shorts_content_avatar">
									<img
										src={user?.avatar ? user.avatar : avatar}
										className="home_shorts_content_avatar_img"
									/>
								</div>
								<div className="shorts_content_p">
									<p className="">{user.username}</p>
								</div>
							</Link>
						);
					})}
				{activeIndex != 0 && (
					<button
						className="shorts_slider_prev_button"
						onClick={handlePrevClick}
					>
						{"<"}
					</button>
				)}
				{activeIndex + 4 < shorts.length - 1 && (
					<button
						className="shorts_slider_next_button"
						onClick={handleNextClick}
					>
						{">"}
					</button>
				)}
			</div>
			{/* </div> */}
		</>
	);
}

export default ShortsSlider;
