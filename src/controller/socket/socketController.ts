import {Socket} from "socket.io";
import {io} from "../../index";
import roomService from "../../service/roomService";
import roomDetailService from "../../service/roomDetailService";
import testDetailService from "../../service/testDetailService";
import attemptService from "../../service/attemptService";
import questionService from "../../service/questionService";
import {RoomDetail} from "../../entity/RoomDetail";
import testService from "../../service/testService";

export function socketController(socket: Socket) {
    console.log('a user connected:', socket.id);

    socket.on('disconnect', async () => {
        console.log('user disconnected:', socket.id);
        const roomDetail = await roomDetailService.leaveRoom(socket.id);
        if (roomDetail) {
            let lobby = `lobby-${roomDetail.room.code}`;
            // io.to(lobby).emit('lobby-update', `${roomDetail.email} leave lobby`);
            io.to(lobby).emit('lobby-update', {
                email: roomDetail.email,
                leave: true
            });
        }
    });

    socket.on('join-lobby', async (arg, callback) => {
        console.log('user join lobby:', arg);
        let room = await roomService.findActiveByCode(arg.roomCode)
        if (room) {
            const email = arg.email
            const lobby = `lobby-${room.code}`;
            if (email == room.user.email) {
                socket.join(lobby);
                callback(await roomDetailService.findAllActiveByRoom(room.id))
            } else {
                if (await roomDetailService.checkIsInRoom(room.code, email)) {
                    callback({
                        success: false,
                        message: 'You have already joined this lobby, ' +
                            'please log out on other tabs and/or devices and try again'
                    });
                } else {
                    socket.join(lobby);
                    let newDetail = await roomDetailService.save(socket.id, room.code, email)
                    let lobbyCurrentSize = io.sockets.adapter.rooms.get(lobby).size;
                    // let msg = `${arg.email} joined the lobby, total: ${lobbyCurrentSize} people in this lobby`
                    let msg = {
                        person: newDetail,
                        total: lobbyCurrentSize - 1,
                        join: true
                    }
                    io.to(lobby).emit('lobby-update', msg);

                    // callback(msg)
                    callback(await roomDetailService.findAllActiveByRoom(room.id))
                }
            }
        } else {
            callback({
                success: false,
                message: "Room does not exist!"
            })
        }
    });

    socket.on('join-room', async (arg, callback) => {
        console.log('user join room:', arg);
        let room = await roomService.findActiveByCode(arg.roomCode)
        if (room) {
            socket.join(`room-${arg.roomCode}`);
            callback(await roomDetailService.findAllByRoom(room.id))
        }

    });

    socket.on('start-test', async (arg, callback) => {
        console.log('user trying to start test:', arg);
        let room = await roomService.findActiveByCode(arg.roomCode);
        console.log("room:", room)
        if (room) {
            const email = arg.email
            const lobby = `lobby-${room.code}`;
            const observationRoom = `room-${room.code}`
            if (email == room.user.email) {
                socket.join(observationRoom);
                let test = await testService.findOne(room.test.id)
                callback({
                    success: true,
                    test: test
                })
                io.to(lobby).emit('start-test', {
                    test: test
                });
            }
        }
    });
    

    socket.on('question-submit', async (arg, callback) => {
        console.log('user submit answer for a question:', arg);
        let room = await roomService.findActiveByCode(arg.roomCode)
        if (room) {
            console.log('room:', room)
            const email = arg.email;
            let roomDetail: RoomDetail = await roomDetailService.checkIsInRoom(room.code, email);
            console.log('roomDetail:', roomDetail)
            if (roomDetail) {
                let isCorrect = await attemptService.checkCorrectness(arg.choice, await questionService.findOne(arg.questionId))
                console.log('isCorrect:', isCorrect);
                let tempArr = JSON.parse(roomDetail.choices);
                tempArr.push(arg.choice);
                roomDetail.choices = JSON.stringify(tempArr);
                if (isCorrect == true) {
                    roomDetail.corrects++;
                } else {
                    roomDetail.incorrects++;
                }
                await roomDetailService.update(roomDetail.id, roomDetail)
                callback(isCorrect);
                io.to(`room-${arg.roomCode}`).emit('room-update', {
                    email: email,
                    corrects: roomDetail.corrects,
                    incorrects: roomDetail.incorrects
                })
            } else {
                callback({
                    success: false,
                    message: "You're not in this room!"
                })
            }
        } else {
            callback({
                success: false,
                message: "Room does not exist!"
            })
        }
    });

    socket.on('send-to-lobby', (arg) => {
        console.log("someone send to lobby", arg.roomCode, arg.msg);
        let lobby = `lobby-${arg.roomCode}`;
        io.to(lobby).emit('lobby-update', arg.msg)
    });

    socket.on('send-all', (arg, callback) => {
        console.log("someone send to everyone");
        io.emit('send-all', arg);
        callback("ok")
    });
}