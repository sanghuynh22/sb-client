import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import {
	BiDotsHorizontal,
	BiLike,
	BiDotsHorizontalRounded,
} from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import WatchCreate from "./components/WatchCreate";
import { useDispatch, useSelector } from "react-redux";
import { getAllWatch } from "./actions/watch/getAllWatch";
import { formatDate } from "./time/formatTime";
import avatar from "./assets/images/avatar-mac-dinh.jpeg";
import ContentLoader from "react-content-loader";
const Watch = () => {
	const dispatch = useDispatch();
	const { watches, isGet } = useSelector((state) => state.watch.getAllWatch);
	const [isCreate, setIsCreate] = useState(false);

	useEffect(() => {
		dispatch(getAllWatch()).then(() => {});
	}, []);
	return (
		<div className="container">
			<Header />
			<div className="watchs">
				<div className="wach_create" onClick={() => setIsCreate(true)}>
					<AiOutlinePlus className="wach_create_icon" />
				</div>
				{!isGet ? (
					watches &&
					watches
						?.sort((a, b) => {
							const dateA = new Date(a.createdAt).getTime();
							const dateB = new Date(b.createdAt).getTime();
							return dateB - dateA;
						})
						?.map((watch, i) => (
							<div className="watch" key={watch._id}>
								<div className="watch_top">
									<div className="watch_infos">
										<img
											src={watch.user.avatar || avatar}
											className="watch_info_img"
										/>
										<div className="watch_info">
											<p className="watch_info_name">{watch.user.username}</p>
											<p className="watch_info_date">
												{formatDate(watch.createdAt)}
											</p>
										</div>
									</div>
									<BiDotsHorizontal className="watch_setting-icon" />
								</div>
								<div className="watch_content">
									<p>{watch.title}</p>
								</div>
								<div className="watch_video">
									<video
										src={`${process.env.REACT_APP_SERVER_URL}/uploads/${watch.file}`}
										type="video/mp4"
										controls
									></video>
								</div>
								<div class="watch_emotions">
									<div class="watch_emotions_left">
										<div class="watch_emotion_left">
											<BiLike className="watch_emotion_icon" />
											<p className="watch_emotion_p">Thích</p>
										</div>

										<div class="watch_emotion_left">
											<RiShareForwardLine className="watch_emotion_icon" />
											<p className="watch_emotion_p">Chia sẻ</p>
										</div>
									</div>
									<div className="watch_emotions_right">
										<div className="watch_emotion_right">
											<img
												src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"
												className="watch_emotion_img"
											/>
											<p className="watch_emotion_pr">{watch.likes || 11}</p>
										</div>

										<div className="watch_emotion_right">
											<p className="watch_emotion_pr">{watch.view || 20}</p>
										</div>
									</div>
								</div>
							</div>
						))
				) : (
					<ContentLoader
						speed={1}
						width={820}
						height={460}
						viewBox="0 0 800 450"
						backgroundColor="#f3f3f3"
						foregroundColor="#b1b3b9"
						style={{ margin: "0 0 0 450px" }}
					>
						<circle cx="34" cy="45" r="31" />
						<rect x="89" y="51" rx="10" ry="10" width="424" height="18" />
						<rect x="-1" y="89" rx="2" ry="2" width="520" height="372" />
						<rect x="90" y="18" rx="10" ry="10" width="424" height="18" />
					</ContentLoader>
				)}
				{isCreate && <WatchCreate setIsCreate={setIsCreate} />}
			</div>
		</div>
	);
};

export default Watch;
