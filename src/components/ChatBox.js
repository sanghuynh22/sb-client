import React, { useState, useMemo, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../time/formatTime";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import io from "socket.io-client";
import { getSocket } from "../socket";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";

const ChatBox = ({ setChat, friend, setSelectedFriend }) => {
	const dispatch = useDispatch();
	const contentRef = useRef();
	const socket = getSocket();
	const [text, setText] = useState("");
	const [timeOff, setTimeOff] = useState(null);
	const { currentUser } = useSelector((state) => state.user.auth);
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		dispatch(fetchAllUsers());
	}, []);
	useEffect(() => {
		contentRef.current.scrollTop = contentRef.current.scrollHeight;
	}, [messages]);
	useEffect(() => {
		socket.emit("getMessages", {
			userId: currentUser._id,
			recipientId: friend._id,
		});

		socket.on("messageHistory", (data) => {
			setMessages([...data, ...messages]);
		});
	}, [friend]);

	const sortedMessages = useMemo(() => {
		return messages.sort(
			(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
		);
	}, [messages]);

	const renderMessages = useMemo(() => {
		return sortedMessages.map((message, index) => {
			const isFromCurrentUser = message.from === currentUser._id;
			const messageClass = isFromCurrentUser
				? "chatbox_content_message_right"
				: "chatbox_content_message_left";

			return (
				<div key={index} className={`chatbox_content_message ${messageClass}`}>
					{messageClass === "chatbox_content_message_left" && (
						<img src={friend.avatar || avatar} class="chatbox_top_info_img" />
					)}

					<p>{message.content}</p>
					{/* <p className={`${messageClass} time`}>
						{formatDate(message.createdAt)}
					</p> */}
				</div>
			);
		});
	}, [sortedMessages, currentUser._id, messages]);

	const handleSendMessage = async () => {
		setText("");
		if (text.trim() !== "") {
			await socket.emit("sendMessage", {
				userId: currentUser._id,
				recipientId: friend._id,
				message: text,
			});
			socket.on("messageReceive", (data) => {
				setText("");
				setMessages([data, ...messages]);
			});
			socket.on("newMessage", (newMessage) => {
				setMessages([newMessage, ...messages]);
			});
		} else {
			alert("khong co text");
		}
	};
	const handleClickClose = () => {
		setText("");
		setChat(false);
		setSelectedFriend(null);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setText("");
			handleSendMessage();
		}
	};
	return (
		<div className="chatbox">
			<div className="chatbox_top">
				<div className="chatbox_top_info">
					<img src={friend.avatar || avatar} className="chatbox_top_info_img" />
					<div className="chatbox_top_info_right">
						<p className="chatbox_top_info_p">{friend.username}</p>
						{users.find((user) => user._id === friend._id).timeOff ? (
							<p className="chatbox_top_info_timeoff">
								hoạt động{" "}
								{formatDate(
									users.find((user) => user._id === friend._id).timeOff
								)}
							</p>
						) : (
							<p className="chatbox_top_info_timeoff">🟢 Đang hoạt động</p>
						)}
					</div>
				</div>
				<AiOutlineClose
					onClick={() => handleClickClose()}
					style={{ fontSize: "20px", cursor: "pointer", color: "#949596" }}
				/>
			</div>
			<div className="chatbox_content" ref={contentRef}>
				{renderMessages}
			</div>
			<div className="chatbox_bot">
				<div className="chatbox_bot_input">
					<input
						placeholder="Aa"
						type="text"
						className="chatbox_input"
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={(e) => handleKeyDown(e)}
					/>
				</div>
				<IoMdSend
					className="chatbox_send_button"
					onClick={() => handleSendMessage()}
				/>
			</div>
		</div>
	);
};

export default ChatBox;
