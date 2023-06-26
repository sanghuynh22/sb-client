import React from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../formatNumber/formatNumber";
import { useSelector } from "react-redux";

const MyShop = () => {
	const { items } = useSelector((state) => state.market.getAllItem);
	const { currentUser } = useSelector((state) => state.user.auth);
	return (
		<>
			<p className="market_left_title">Shop của {currentUser.username}</p>
			<div className="market_center_container">
				{items
					.filter((item) => item.seller._id === currentUser._id)
					.map((item) => (
						<Link
							to={`/marketplace/${item._id}`}
							className="market_center_item"
							key={item._id}
						>
							<img src={item.image} className="market_center_item_img" />
							<p className="market_price">
								<span> {formatNumber(item?.price)} </span>đ
							</p>
							<p className="market_details">{item.description}</p>
							<p
								className="market_details"
								style={{
									fontSize: "10px",
									textDecoration: "underline",
									fontWeight: "600",
									marginTop: "5px",
								}}
							>
								Số lượng tồn kho còn : {item.amount}
							</p>
						</Link>
					))}
			</div>
		</>
	);
};

export default MyShop;
