export const checkRoleTeacherOrAdmin = (req, res, next) => {
    if (req.decode.role === 2 || req.decode.role === 1) {
        next()
    } else {
        res.status(401).json({
            message: 'You must be a teacher'
        })
    }
}