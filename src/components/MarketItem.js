import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatNumber } from "../formatNumber/formatNumber";
import { useDispatch, useSelector } from "react-redux";
import { getAllItem } from "../actions/market/getAllItem";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { BsMessenger } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../assets/images/logo.jpeg";
import { buyItem } from "../actions/market/buyItem";
import { List } from "react-content-loader";
const MarketItem = () => {
	const dispatch = useDispatch();
	const [amount, setAmount] = useState(1);
	const { id } = useParams();
	const { currentUser } = useSelector((state) => state.user.auth);
	const { items, isGet } = useSelector((state) => state.market.getAllItem);
	useEffect(() => {
		dispatch(getAllItem());
	}, [id]);
	const handleClickBuy = (buyer, item, amount, price, status, name) => {
		dispatch(buyItem({ buyer, item, amount, price, status })).then(() => {
			alert(`Mua thành công sản phẩm ${name} với số lượng ${amount}`);
			setAmount(1);
		});
	};
	return (
		<>
			{false ? (
				items
					?.filter((item) => item._id === id)
					?.map((item) => (
						<div className="market-item_container" key={item._id}>
							<div className="market-item_top">
								<Link to={`/marketplace`} className="storyCreate_out_container">
									<AiOutlineClose className="storyCreate_out" />
								</Link>
								<Link to="/">
									<img src={logo} className="logo" />
								</Link>
							</div>
							<div className="market-item_right_left">
								{item.image ? (
									<img
										src={item.image}
										className="marketcreate_right_left_img"
									/>
								) : (
									<p className="marketcreate_right_left_p">
										Hình ảnh sản phẩm hiện ở đây
									</p>
								)}
							</div>
							<div className="marketcreate_right_info">
								<p className="market_info_title">{item.title}</p>

								<p className="market_info_price">{formatNumber(item.price)}</p>

								<p className="market_info_price">{item.description}</p>

								<div className="line_market"></div>
								<p className="marketcreate_info_seller">Thông tin người bán</p>
								<div className="marketcreate_info_user">
									<img
										src={item.seller.avatar || avatar}
										className="marketcreate_info_avatar"
									/>
									<p className="marketcreate_info_user_p">
										{item.seller.username}
									</p>
								</div>
								<div className="market-item_send">
									<div className="market-item_send_info">
										<BsMessenger className="market-item_send_info_icon" />
										<p className="market-item_send_info_p">
											Gửi tin nhắn cho người bán
										</p>
									</div>
									<div className="market-item_send_mess">
										<p className="market-item_send_mess_p">
											Mặt hàng này còn chứ bạn?
										</p>
									</div>
									<div className="market-item_send_button">
										<p className="market-item_send_button_p">Gửi</p>
									</div>
									<div className="market-item_send_sell">
										<p className="market-item_send_sell_p">Số lượng mua:</p>
										<div className="market-item_send_sell_info">
											<div className="market-item_send_sell_contain">
												<input
													type="number"
													value={amount}
													onChange={(e) => setAmount(e.target.value)}
													className="market-item_send_sell_input"
												/>
											</div>
											<p className="market-item_send_sell_total">
												<span className="market-item_send_sell_total_span">
													Tổng tiền :
												</span>{" "}
												{formatNumber(item.price * amount)}
											</p>
										</div>
									</div>
									<div
										className="market-item_send_button buy"
										onClick={() =>
											handleClickBuy(
												currentUser._id,
												item._id,
												amount,
												item.price,
												0,
												item.title
											)
										}
									>
										<p className="market-item_send_button_p">Mua hàng</p>
									</div>
								</div>
							</div>
						</div>
					))
			) : (
				<List style={{ width: "100%" }} />
			)}
		</>
	);
};

export default MarketItem;
