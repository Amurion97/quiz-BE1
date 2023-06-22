import {Socket} from "socket.io";
import {io} from "../../index";

export function socketController(socket: Socket) {
    console.log('a user connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });

    socket.on('join-room', (value) => {
        console.log('user join room:', value);
        socket.join(String(value));
        socket.to(String(value)).emit('foo', 'someone join room')
        // io.emit('foo', value);
    });

    socket.on('send-to-room', (roomID, msg) => {
        console.log("someone send to room", roomID, msg)
        io.to(String(roomID)).emit('foo', msg)
        // io.emit('foo', value);
    });
}