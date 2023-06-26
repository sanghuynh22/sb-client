import React, { useEffect, useMemo, useState } from "react";
import "../index.css";
import logo from "../assets/images/logo.jpeg";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useNavigate,
	useParams,
	useLocation,
} from "react-router-dom";
import { BsSearch, BsMessenger, BsFillBellFill } from "react-icons/bs";
import { AiFillHome, AiFillShop } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdSmartDisplay } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../actions/user/auth";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import { updateUser } from "../actions/user/updateUser";
import { getSocket } from "../socket";

const Header = () => {
	const socket = getSocket();
	const location = useLocation();
	const { path } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [text, setText] = useState();
	const [currentPath, setCurrentPath] = useState("");
	const { currentUser } = useSelector((state) => state.user.auth);
	const { users } = useSelector((state) => state.user.fetchAllUsers);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch, updateUser]);
	useEffect(() => {
		setCurrentPath(path);
	}, [path]);
	const handleClickLogOut = () => {
		dispatch(authLogout());
		socket.emit("user-disconnect");
		navigate("/");
	};
	const handleFind = async (e) => {
		const text = e.target.value.trim().toLowerCase();
		setText(text);
	};
	const usersFound = useMemo(() => {
		if (text)
			return users.filter((user) => user.username.toLowerCase().includes(text));
	}, [handleFind, text, setText]);
	return (
		<div className="header">
			<div className="header_left">
				<Link to="/">
					<img src={logo} className="logo" />
				</Link>
				<div className="header_search">
					<BsSearch className="header_search_icon" />
					<input
						placeholder="Tìm kiếm trên Sangbook"
						className="header_sarch_input"
						value={text}
						onChange={(e) => handleFind(e)}
					/>
					<div className="header_search_sudos">
						{usersFound?.length > 0 &&
							usersFound.map((user) => (
								<Link
									to={`/profile/${user._id}`}
									className="header_search_sudo"
									key={user._id}
									onClick={() => setText("")}
								>
									<img
										src={user?.avatar ? user.avatar : avatar}
										className="header_search_sudo_img"
									/>
									<p className="header_search_sudo_p">{user.username}</p>
								</Link>
							))}
					</div>
				</div>
			</div>

			<div className="header_center">
				<Link
					to={"/"}
					className={`header_center_option ${
						location.pathname === "/" ? "active" : ""
					}`}
				>
					<AiFillHome className="header_center_option_icon" />
				</Link>
				<Link
					to={"/friends"}
					className={`header_center_option ${
						location.pathname === "/friends" ? "active" : ""
					}`}
				>
					<FaUserFriends className="header_center_option_icon" />
				</Link>
				<Link
					to={"/watch"}
					className={`header_center_option ${
						location.pathname === "/watch" ? "active" : ""
					}`}
				>
					<MdSmartDisplay className="header_center_option_icon" />
				</Link>
				<Link
					to={"/marketplace"}
					className={`header_center_option ${
						location.pathname === "/marketplace" ? "active" : ""
					}`}
				>
					<AiFillShop className="header_center_option_icon" />
				</Link>
			</div>
			<div className="header_right">
				<div className="header_right_option">
					<CgMenuGridO className="header_right_option_icon" />
				</div>
				<div className="header_right_option">
					<BsMessenger className="header_right_option_icon" />
				</div>
				<div className="header_right_option">
					<BsFillBellFill className="header_right_option_icon" />
				</div>
				<div className="header_right_avatar">
					<img
						src={
							users?.find((user) => user._id === currentUser._id).avatar ||
							avatar
						}
						className="header_right_option_avatar"
					/>
					<div class="header_right_avatar_sudo">
						<Link to={`/profile/${currentUser._id}`} class="profile-link">
							Profile
						</Link>
						<a href="#" class="logout-link" onClick={() => handleClickLogOut()}>
							Đăng xuất
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
