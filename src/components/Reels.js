import { useState, useRef } from "react";
import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import img1 from "../assets/images/bien.png";
import img2 from "../assets/images/dulich.webp";
import img3 from "../assets/images/dulich2.jpeg";
import img4 from "../assets/images/nui2.jpeg";
import img5 from "../assets/images/dulich3.png";
import img6 from "../assets/images/nui.png";
function Reels() {
	let shorts = [
		{
			img: img1,
			view: 220,
		},
		{
			img: img2,
			view: 832,
		},
		{
			img: img3,
			view: 205,
		},
		{
			img: img4,
			view: 524,
		},
		{
			img: img5,
			view: 740,
		},
		{
			img: img6,
			view: 300,
		},
	];
	const containerRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

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
				<div className="home_shorts_content_option">
					<img src={avatar} className="home_shorts_content_img" />
					<div className="home_shorts_content_create">
						<AiOutlinePlus className="home_shorts_content_create_icon" />
					</div>
					<p className="shorts_content_p">Tạo reels</p>
					<div className="home_shorts_content_hidden"></div>
				</div>
				{shorts.map((short, i) => {
					return (
						<div className="home_shorts_content_option" key={i}>
							<img src={short.img} className="home_shorts_content_img" />

							<p className="shorts_content_p">▶︎ {short.view}</p>
						</div>
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

export default Reels;
