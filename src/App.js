import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Friends from "./Friends";
import Watch from "./Watch";
import Marketplace from "./Marketplace";
import Error from "./Error";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import Register from "./components/Register";
import Story from "./components/Story";
import Profile from "./components/Profile";
import MarketItem from "./components/MarketItem";
import { useEffect } from "react";
import { getSocket } from "./socket";
function App() {
	const socket = getSocket();
	const { currentUser } = useSelector((state) => state.user.auth);
	useEffect(() => {
		window.addEventListener("beforeunload", () => socket.emit("disconnect"));
		window.addEventListener("unload", () => socket.emit("disconnect"));

		return () => {
			window.removeEventListener("beforeunload", () =>
				socket.emit("disconnect")
			);
			window.removeEventListener("unload", () => socket.emit("disconnect"));
		};
	}, []);

	return (
		<Routes>
			{currentUser ? (
				<>
					<Route path="" element={<Home />} />
					<Route path="profile/:userId" element={<Profile />} />
				</>
			) : (
				<Route path="" element={<Login />} />
			)}
			{}
			<Route path="register" element={<Register />} />
			<Route path="story" element={<Story />} />
			<Route path="story/:userId" element={<Story />} />
			<Route path="friends" element={<Friends />} />
			<Route path="watch" element={<Watch />} />
			<Route path="marketplace" element={<Marketplace />} />
			<Route path="marketplace/:id" element={<MarketItem />} />
			<Route path="*" element={<Error />} />
		</Routes>
	);
}

export default App;
