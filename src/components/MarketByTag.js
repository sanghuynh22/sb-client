import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItem } from "../actions/market/getAllItem";
import { formatNumber } from "../formatNumber/formatNumber";

const MarketByTag = ({ tag, text, setTag }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.market.getAllItem);
	useEffect(() => {
		dispatch(getAllItem());
	}, [tag, setTag]);
	return (
		<>
			<div className="market_left_title">{text}</div>
			<div className="market_center_container">
				{items
					.filter((item) => item.tag == tag)
					.map((item) => (
						<div className="market_center_item">
							<img src={item.image} className="market_center_item_img" />
							<p className="market_price">
								<span> {formatNumber(item?.price)} </span>đ
							</p>
							<p className="market_details">{item.description}</p>
						</div>
					))}
			</div>
		</>
	);
};

export default MarketByTag;
