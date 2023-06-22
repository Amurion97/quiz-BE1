import {Socket} from "socket.io";
import {io} from "../../index";
import roomService from "../../service/roomService";
import roomDetailService from "../../service/roomDetailService";

export function socketController(socket: Socket) {
    console.log('a user connected:', socket.id);
    socket.on('disconnect', async () => {
        console.log('user disconnected:', socket.id);
        await roomDetailService.leaveRoom(socket.id)
    });

    socket.on('join-room', async (arg, callback) => {
        console.log('user join room:', arg);
        let room = await roomService.findActiveByCode(arg.roomCode)
        if (room) {
            const email = arg.email
            if (await roomDetailService.checkIsInRoom(room.code, email)) {
                socket.emit('already-in-room', 'You have already joined this room, ' +
                    'please log out on other devices and try again')
            } else {
                socket.join(room.code);
                await roomDetailService.save(socket.id, room.code, email)
                let roomCurrentSize = io.sockets.adapter.rooms.get(room.code).size;
                let msg = `${arg.email} join room, total: ${roomCurrentSize} people in this room`
                io.to(room.code).emit('room-update', msg);
            }
        }


        // io.emit('foo', value);
    });

    socket.on('send-to-room', (roomID, msg) => {
        console.log("someone send to room", roomID, msg)
        io.to(String(roomID)).emit('foo', msg)
        // io.emit('foo', value);
    });
}