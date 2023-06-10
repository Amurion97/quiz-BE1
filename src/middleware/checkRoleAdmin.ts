export const checkRoleAdmin = (req, res, next) => {

    if (req.decode.role===1){
       return  next()
    } else {
        res.status(401).json({
            message: "ban khong co quyen landlord",
            success: false
    })
    }

}