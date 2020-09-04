import socketIo from "socket.io";
import jwt from "jsonwebtoken";

export class SocketService {
  constructor(server) {
    this.io = socketIo(server);
    this.user = {};
    this.io.on("connection", socket => {
      console.log("new connection");
      socket.on("user-connected", accessToken => {
        console.log("user open connection.");
        const decode = jwt.decode(accessToken, { complete: true });
        const publicAddress = decode.payload.publicAddress;
        if (!this.user.hasOwnProperty(publicAddress)) {
          this.user[publicAddress] = [socket.id];
        } else {
          this.user[publicAddress].push(socket.id); // if user logged in on multiple divices
        }
      });
      console.log("finish setup connection");

      socket.on("disconnect", () => {
        console.log("user disconnect", socket.id);
        for (let publicAddress in this.user) {
          if (this.user[publicAddress].includes(socket.id)) {
            const newArraySocketId = this.user[publicAddress].filter(
              item => item !== socket.id
            );
            this.user[publicAddress] = newArraySocketId;
            return;
          }
        }
      });
    });
  }

  // emit event to all client
  emiter(event, body) {
    if (body) this.io.emit(event, body);
  }

  // emit event to individual client with publicAddress
  emitEventToIndividualClient(event, publicAddress, message) {
    if (this.user[publicAddress])
      this.user[publicAddress].map(socketId => {
        this.io.to(socketId).emit(event, message);
      });
  }
}
