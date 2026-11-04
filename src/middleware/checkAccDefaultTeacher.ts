import userService from "../service/userService";

export const checkAccDefaultTeacher = (req, res, next) => {
    if (req.decode.email !== userService.defaultTeacherEmail) {
        next()
    } else {
        res.status(401).json({
            message: 'Tài khoản dùng thử của giáo viên không được thực hiện tính năng này'
        })
    }
}