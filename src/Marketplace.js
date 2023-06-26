import React, { useEffect, useState } from "react";
import { BsSearch, BsFillCartCheckFill, BsMusicNoteList } from "react-icons/bs";
import { AiFillShop } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdPhonePortrait } from "react-icons/io";
import { AiOutlineLaptop } from "react-icons/ai";
import { GiElectric } from "react-icons/gi";
import { BiHomeHeart } from "react-icons/bi";
import Header from "./components/Header";
import MarketCreate from "./components/MarketCreate";
import { useDispatch, useSelector } from "react-redux";
import { getAllItem } from "./actions/market/getAllItem";
import { formatNumber } from "./formatNumber/formatNumber";
import MarketByTag from "./components/MarketByTag";
import { Link } from "react-router-dom";
import MyCart from "./components/MyCart";
import MyShop from "./components/MyShop";
import ContentLoader from "react-content-loader";

const Marketplace = () => {
	const dispatch = useDispatch();
	const [active, setActive] = useState("all");
	const [myShop, setMyShop] = useState(false);
	const [cart, setCart] = useState(false);
	const [text, setText] = useState("");
	const [isCreate, setIsCreate] = useState(false);
	const [tag, setTag] = useState("");
	const { items, isGet } = useSelector((state) => state.market.getAllItem);
	useEffect(() => {
		dispatch(getAllItem());
	}, [isCreate, tag]);
	const handleClickAll = () => {
		setCart(false);
		setMyShop(false);
		setActive("all");
		setTag("");
		setText("");
	};
	const handleClickGiohang = () => {
		setTag("");
		setActive("giohang");
		setMyShop(false);
		setCart(true);
	};
	const handleClickMyShop = () => {
		setTag("");
		setActive("myshop");
		setCart(false);
		setMyShop(true);
	};
	const handleClickPhone = () => {
		setCart(false);
		setMyShop(false);
		setActive("phone");
		setTag("phone");
		setText("Điện thoại");
	};
	const handleClickLaptop = () => {
		setCart(false);
		setMyShop(false);
		setActive("laptop");
		setTag("laptop");
		setText("Laptop");
	};
	const handleClickFamily = () => {
		setCart(false);
		setMyShop(false);
		setActive("family");
		setTag("family");
		setText("Gia đình");
	};
	const handleClickElectric = () => {
		setCart(false);
		setMyShop(false);
		setActive("electric");
		setTag("electric");
		setText("Điện tử");
	};
	const handleClickMusic = () => {
		setCart(false);
		setMyShop(false);
		setActive("music");
		setTag("music");
		setText("Nhạc cụ");
	};
	return (
		<div className="container">
			{isCreate ? (
				<MarketCreate setIsCreate={setIsCreate} />
			) : (
				<>
					<Header />
					<div className="market">
						<div className="market_left">
							<o className="market_left_title">Marketplace</o>
							<div className="market_left_search">
								<BsSearch className="market_left_search_icon" />
								<input
									placeholder="Tìm kiếm trên Marketplace"
									className="market_left_search_input"
								/>
							</div>
							<div className="market_left_options">
								<div
									className={
										active === "all"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickAll()}
								>
									<div className="market_left_option_icons">
										<AiFillShop className="market_left_option_icon" />
									</div>
									<p>Lướt xem tất cả</p>
								</div>
								<div
									className={
										active === "giohang"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickGiohang()}
								>
									<div className="market_left_option_icons">
										<BsFillCartCheckFill className="market_left_option_icon" />
									</div>
									<p>Giỏ hàng</p>
								</div>
								<div
									className={
										active === "myshop"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickMyShop()}
								>
									<div className="market_left_option_icons">
										<GiShoppingBag className="market_left_option_icon" />
									</div>
									<p>Shop của tôi </p>
								</div>
								<div
									className="market_create"
									onClick={() => setIsCreate(true)}
								>
									<p>+ Tạo sản phẩm</p>
								</div>
							</div>
							<div className="market_left_options">
								<div
									className={
										active === "phone"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickPhone()}
								>
									<div className="market_left_option_icons">
										<IoMdPhonePortrait className="market_left_option_icon" />
									</div>
									<p>Điện thoại</p>
								</div>
								<div
									className={
										active === "laptop"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickLaptop()}
								>
									<div className="market_left_option_icons">
										<AiOutlineLaptop className="market_left_option_icon" />
									</div>
									<p>Laptop</p>
								</div>
								<div
									className={
										active === "family"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickFamily()}
								>
									<div className="market_left_option_icons">
										<BiHomeHeart className="market_left_option_icon" />
									</div>
									<p>Gia đình</p>
								</div>
								<div
									className={
										active === "electric"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickElectric()}
								>
									<div className="market_left_option_icons">
										<GiElectric className="market_left_option_icon" />
									</div>
									<p>Điện tử</p>
								</div>
								<div
									className={
										active === "music"
											? "market_left_option active"
											: "market_left_option"
									}
									onClick={() => handleClickMusic()}
								>
									<div className="market_left_option_icons">
										<BsMusicNoteList className="market_left_option_icon" />
									</div>
									<p>Nhạc cụ</p>
								</div>
							</div>
						</div>
						<div className="market_center">
							{tag ? (
								<MarketByTag tag={tag} text={text} setTag={setTag} />
							) : cart ? (
								<MyCart />
							) : myShop ? (
								<MyShop />
							) : (
								<>
									<p className="market_left_title">Lựa chọn hôm nay</p>
									<div className="market_center_container">
										{!isGet ? (
											items?.map((item) => (
												<Link
													to={`/marketplace/${item._id}`}
													className="market_center_item"
													key={item._id}
												>
													<img
														src={item.image}
														className="market_center_item_img"
													/>
													<p className="market_price">
														<span> {formatNumber(item?.price)} </span>đ
													</p>
													<p className="market_details">{item.description}</p>
												</Link>
											))
										) : (
											<ContentLoader
												speed={1}
												width={800}
												height={460}
												viewBox="0 0 500 260"
												backgroundColor="#f3f3f3"
												foregroundColor="#b1b3b9"
											>
												<rect
													x="17"
													y="165"
													rx="9"
													ry="9"
													width="106"
													height="20"
												/>
												<rect
													x="16"
													y="16"
													rx="17"
													ry="17"
													width="112"
													height="145"
												/>
												<rect
													x="175"
													y="16"
													rx="17"
													ry="17"
													width="109"
													height="145"
												/>
												<rect
													x="211"
													y="38"
													rx="0"
													ry="0"
													width="0"
													height="1"
												/>
												<rect
													x="325"
													y="13"
													rx="17"
													ry="17"
													width="110"
													height="144"
												/>
												<rect
													x="328"
													y="165"
													rx="9"
													ry="9"
													width="105"
													height="17"
												/>
												<rect
													x="179"
													y="166"
													rx="9"
													ry="9"
													width="104"
													height="19"
												/>
											</ContentLoader>
										)}
									</div>
								</>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Marketplace;
