import io from "socket.io-client";

let socket;

export const getSocket = () => {
	if (!socket) {
		// Nếu socket chưa khởi tạo, hãy khởi tạo nó và lưu vào biến global
		socket = io(process.env.REACT_APP_SERVER_URL, {
			transports: ["websocket"],
			upgrade: false,
		});
	}

	return socket;
};
