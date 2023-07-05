import * as jwt from 'jsonwebtoken'

export const SECRET = '123456'
export const auth = (req, res, next) => {
    let authorization = req.headers.authorization
    if (authorization) {
        let accessToken = req.headers.authorization.split(" ")[1];
        if (accessToken) {
            jwt.verify(accessToken, SECRET, (err, payload) => {
                if (err) {
                    res.status(401).json({
                        error: err.message,
                        message: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại",
                        success: false
                    })
                } else {
                    // console.log("payload:", payload)
                    req.decode = payload;
                    return next();
                }
            })
        } else {
            res.status(401).json({
                message: "No token provided",
                success: false
            })
        }
    } else {
        res.status(401).json({
            message: "No token provided",
            success: false
        })
    }

}
