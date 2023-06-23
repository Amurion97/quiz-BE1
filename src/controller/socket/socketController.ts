import {Socket} from "socket.io";
import {io} from "../../index";
import roomService from "../../service/roomService";
import roomDetailService from "../../service/roomDetailService";

export function socketController(socket: Socket) {
    console.log('a user connected:', socket.id);
    socket.on('disconnect', async () => {
        console.log('user disconnected:', socket.id);
        const roomDetail = await roomDetailService.leaveRoom(socket.id);
        if (roomDetail) {
            let lobby = `lobby-${roomDetail.room.code}`;
            io.to(lobby).emit('lobby-update', `${roomDetail.email} leave room`);
        }

    });

    socket.on('join-lobby', async (arg, callback) => {
        console.log('user join lobby:', arg);
        let room = await roomService.findActiveByCode(arg.roomCode)
        if (room) {
            const email = arg.email
            if (await roomDetailService.checkIsInRoom(room.code, email)) {
                socket.emit('already-in-room', 'You have already joined this room, ' +
                    'please log out on other devices and try again')
            } else {
                let lobby = `lobby-${room.code}`;
                socket.join(lobby);
                await roomDetailService.save(socket.id, room.code, email)
                let lobbyCurrentSize = io.sockets.adapter.rooms.get(lobby).size;
                let msg = `${arg.email} join lobby, total: ${lobbyCurrentSize} people in this lobby`
                io.to(lobby).emit('lobby-update', msg);
            }
        }
    });

    socket.on('send-to-room', (arg) => {
        console.log("someone send to lobby", arg.roomCode, arg.msg);
        let lobby = `lobby-${arg.roomCode}`;
        io.to(lobby).emit('foo', arg.msg)
    });
}