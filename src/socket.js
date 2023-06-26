import io from "socket.io-client";

let socket;

export const getSocket = () => {
	if (!socket) {
		// Nếu socket chưa khởi tạo, hãy khởi tạo nó và lưu vào biến global
		socket = io("http://localhost:3000", {
			transports: ["websocket"],
			upgrade: false,
		});
	}

	return socket;
};
