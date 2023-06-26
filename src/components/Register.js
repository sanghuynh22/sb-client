import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { authLogin } from "../actions/user/auth";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import { fetchUser } from "../actions/user/fetchUser";
import { Link } from "react-router-dom";
import { registerUser } from "../actions/user/registerUser";

const Register = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [mess, setMess] = useState("");
	const [error, setError] = useState("");
	const [isSee, setIsSee] = useState(false);
	const handleClickPassword = () => {
		setIsSee(!isSee);
	};
	const handleClickRegister = async () => {
		if (
			username.length >= 6 &&
			password.length >= 6 &&
			password === rePassword
		) {
			setError("");
			dispatch(registerUser(username, password))
				.then((user) => {
					if (user) {
						setMess(`user với username ${username} đã được tạo`);
						setUsername("");
						setPassword("");
						setRePassword("");
					}
				})
				.catch((errMess) => {
					setMess(errMess);
				});
		} else {
			setMess("");
			setError("Hãy nhập đầy đủ thông tin!");
		}
	};
	return (
		<div>
			<div className="register">
				<p className="login_title">Sangbook</p>
				<p className="login_title_p">Register</p>
				<div className="register_container">
					<div className="register_bar_container">
						<div className="register_bar">
							<input
								placeholder="examp123"
								className="register_input"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						{isSee ? (
							<>
								<div className="register_bar">
									<input
										placeholder="password123"
										className="register_input"
										type="text"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<AiFillEye
										className="register_eye"
										onClick={() => handleClickPassword()}
									/>
								</div>
								<div className="register_bar">
									<input
										placeholder="password123"
										className="register_input"
										type="text"
										value={rePassword}
										onChange={(e) => setRePassword(e.target.value)}
									/>
								</div>
							</>
						) : (
							<>
								<div className="register_bar">
									<input
										placeholder="password123"
										className="register_input"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<AiFillEyeInvisible
										className="register_eye"
										onClick={() => handleClickPassword()}
									/>
								</div>
								<div className="register_bar">
									<input
										placeholder="password123"
										className="register_input"
										type="password"
										value={rePassword}
										onChange={(e) => setRePassword(e.target.value)}
									/>
								</div>
							</>
						)}
						{mess && (
							<p
								style={{ fontSize: "12px", fontWeight: "bold", color: "green" }}
							>
								{mess}
							</p>
						)}
						{error && (
							<p style={{ fontSize: "12px", fontWeight: "bold", color: "red" }}>
								{error}
							</p>
						)}
						<div
							className="register_button"
							onClick={() => handleClickRegister()}
						>
							<p className="register_button_p">Create a new account</p>
						</div>
						<div className="line"></div>
						<Link to="/" className="register_button create">
							<p className="register_button_p">Log in</p>
						</Link>
					</div>
					<footer className="register_footer">
						<p className="register_footer_p">@Sang Huynh</p>
					</footer>
				</div>
			</div>
		</div>
	);
};

export default Register;
