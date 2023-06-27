import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { authLogin } from "../actions/user/auth";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { fetchUser } from "../actions/user/fetchUser";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/user/loginUser";
import io from "socket.io-client";
import { getSocket } from "../socket";
const Login = () => {
	const socket = getSocket();
	const dispatch = useDispatch();
	const [id, setId] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isSee, setIsSee] = useState(false);
	const { users, isLoading, error } = useSelector(
		(state) => state.user.fetchAllUsers
	);
	const { user } = useSelector((state) => state.user.loginUser);
	const { currentUser } = useSelector((state) => state.user.auth);
	useEffect(() => {
		dispatch(fetchAllUsers()).then(() => {
			console.log("all login users: ", users);
		});
	}, []);
	const handleClickCard = async (user) => {
		dispatch(authLogin(user)).then((user) => {
			socket.emit("login", user._id);
		});
	};
	const handleClickPassword = () => {
		setIsSee(!isSee);
	};

	const handleClickLogin = async () => {
		if (username.length >= 6 && password.length >= 6) {
			dispatch(loginUser({ username, password })).then((user) => {
				dispatch(authLogin(user));
				socket.emit("login", user._id);
			});
		}
	};
	return (
		<div className="login">
			<div className="login_container_left">
				<p className="login_title">Sangbook</p>
				<p className="login_title_p">Đăng nhập nhanh:</p>

				{isLoading ? (
					<div class="login_loading">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				) : (
					<div className="login_card_container">
						{users?.map((u) => (
							<div
								className="login_card"
								key={u._id}
								onClick={() => handleClickCard(u)}
							>
								<img
									src={!u.avatar ? avatar : u.avatar}
									className="login_card_img"
								/>
								<p className="login_card_p">{u.username}</p>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="login_container_right">
				<div className="login_bar_container">
					<div className="login_bar">
						<input
							placeholder="examp123"
							className="login_input"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="login_bar">
						{isSee ? (
							<>
								<input
									placeholder="password123"
									className="login_input"
									type="text"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>

								<AiFillEye
									className="login_eye"
									onClick={() => handleClickPassword()}
								/>
							</>
						) : (
							<>
								<input
									placeholder="password123"
									className="login_input"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<AiFillEyeInvisible
									className="login_eye"
									onClick={() => handleClickPassword()}
								/>
							</>
						)}
					</div>
					<div className="login_button" onClick={() => handleClickLogin()}>
						<p className="login_button_p">Log in</p>
					</div>
					<div className="line"></div>
					<Link to="/register" className="login_button create">
						<p className="login_button_p">Create a new account</p>
					</Link>
				</div>
				<footer className="login_footer">
					<p className="login_footer_p">@Sang Huynh</p>
				</footer>
			</div>
		</div>
	);
};

export default Login;
