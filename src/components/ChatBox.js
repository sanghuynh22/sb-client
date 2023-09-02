import React, { useState, useMemo, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../time/formatTime";
import avatar from "../assets/images/avatar-mac-dinh.jpeg";
import io from "socket.io-client";
import { getSocket } from "../socket";
import { fetchAllUsers } from "../actions/user/fetchAllUsers";
import { fetchMessages } from "../actions/user/fetchMessages";

const ChatBox = ({ setChat, friend, setSelectedFriend, isOnline }) => {
	const dispatch = useDispatch();
	const contentRef = useRef();
	const socket = getSocket();
	const [text, setText] = useState("");
	const [timeOff, setTimeOff] = useState(null);
	const { currentUser } = useSelector((state) => state.user.auth);
	const { users } = useSelector((state) => state.user.fetchAllUsers);
	const { mess } = useSelector((state) => state.user.fetchMessages);
	const [messages, setMessages] = useState([
		// {
		// 	from: currentUser._id,
		// 	to: "user2_id",
		// 	content: "Hello user2!",
		// 	createdAt: new Date("2023-05-24T09:00:00Z"),
		// },
		// {
		// 	from: "user2_id",
		// 	to: currentUser._id,
		// 	content: "Hi there!",
		// 	createdAt: new Date("2023-05-24T09:01:00Z"),
		// },
		// {
		// 	from: "user1_id",
		// 	to: currentUser._id,
		// 	content: "How are you?",
		// 	createdAt: new Date("2023-05-24T09:02:00Z"),
		// },
	]);
	useEffect(() => {
		dispatch(fetchAllUsers());
	}, []);
	useEffect(() => {
		dispatch(
			fetchMessages({ userId: currentUser._id, receiverId: friend._id })
		).then((data) => {
			setMessages([...data]);
			console.log("data:::", ...data);
		});
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

	useEffect(() => {
		if (socket === null) return;
		socket.on("getMessages", (data) => {
			if (data.to != currentUser._id) return;
			setMessages((prev) => [...prev, data]);
			console.log("getMessage:::", data);
		});

		return () => {
			socket.off("getMessages");
		};
	}, [socket, messages]);

	const sortedMessages = useMemo(() => {
		return messages?.sort(
			(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
		);
	}, [messages]);

	const renderMessages = useMemo(() => {
		return sortedMessages.map((message, index) => {
			console.log("messages::::", message);
			console;
			const isFromCurrentUser = message.from == currentUser._id;
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
		if (text.trim() !== "") {
			let messData = {
				userId: currentUser._id,
				recipientId: friend._id,
				message: text,
			};
			await socket.emit("sendMessage", messData);
			setMessages((prev) => [
				...prev,
				{
					from: currentUser._id,
					to: friend._id,
					content: text,
					createdAt: new Date(),
				},
			]);
			setText("");
			// socket.on("messageReceive", (data) => {
			// 	setText("");
			// 	setMessages([data, ...messages]);
			// });
			// socket.on("newMessage", (newMessage) => {
			// 	setMessages([newMessage, ...messages]);
			// });
		} else {
			alert("khong co text");
		}
	};
	const handleClickClose = () => {
		setChat(false);
		setSelectedFriend(null);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
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
						{!isOnline(friend._id) ? (
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
