import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBought } from "../actions/market/getBought";
const MyCart = () => {
	const dispatch = useDispatch();
	const { boughtItems } = useSelector((state) => state.market.getBought);
	const [cart, setCart] = useState(true);
	const { currentUser } = useSelector((state) => state.user.auth);
	useEffect(() => {
		dispatch(getBought(currentUser._id)).then(() => {});
	}, []);
	const handleClickCart = () => {
		setCart(true);
	};
	const handleClickUnCart = () => {
		setCart(false);
	};
	return (
		<div className="myCart">
			<div className="myCart_top">
				<div
					className={cart ? "myCart_top_option active" : "myCart_top_option"}
					onClick={() => handleClickCart()}
				>
					<p className="myCart_top_p">Giỏ hàng</p>
				</div>
				<div
					className={!cart ? "myCart_top_option active" : "myCart_top_option"}
					onClick={() => handleClickUnCart()}
				>
					<p className="myCart_top_p">Sản phẩm đã mua</p>
				</div>
			</div>
			<div className="myCart_content">
				{cart
					? boughtItems
							?.filter((item) => item.status === 0)
							?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
							?.map((item) => (
								<div className="myCart_option" key={item._id}>
									<img src={item.item.image} className="myCart_option_img" />
									<div className="myCart_option_info">
										<div className="myCart_option_info_left">
											<p className="myCart_option_info_left_p title">
												{item.item.title}
											</p>
											<p className="myCart_option_info_left_p">
												Giá: {item.price.toLocaleString("de-De")}đ
											</p>
											<p className="myCart_option_info_left_p">
												Số lượng: {item.amount}
											</p>
										</div>
										<div className="myCart_option_info_right">
											<p className="myCart_option_info_right_p">
												Tổng tiền :{" "}
												{(item.amount * item.price).toLocaleString("de-De")}đ
											</p>
											<p className="myCart_option_info_right_status">
												{item.status === 0 && "đang giao hàng"}
											</p>
										</div>
									</div>
								</div>
							))
					: boughtItems
							.filter((item) => item.status === 1)
							.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
							?.map((item) => (
								<div className="myCart_option" key={item._id}>
									<img src={item.item.image} className="myCart_option_img" />
									<div className="myCart_option_info">
										<div className="myCart_option_info_left">
											<p className="myCart_option_info_left_p title">
												{item.item.title}
											</p>
											<p className="myCart_option_info_left_p">
												Giá: {item.price.toLocaleString("de-De")}đ
											</p>
											<p className="myCart_option_info_left_p">
												Số lượng: {item.amount}
											</p>
										</div>
										<div className="myCart_option_info_right">
											<p className="myCart_option_info_right_p">
												Tổng tiền :{" "}
												{(item.amount * item.price).toLocaleString("de-De")}đ
											</p>
											<p
												className="myCart_option_info_right_status"
												style={{ color: "#d91a09" }}
											>
												đã giao hàng
											</p>
										</div>
									</div>
								</div>
							))}
			</div>
		</div>
	);
};

export default MyCart;
