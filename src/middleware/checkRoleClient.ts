export const checkRoleClient = (req, res, next) => {
    if(req.decode.role === 1){
        next()
    }else{
        res.status(401).json({
            message: 'You must be an administrator'
        })
    }
}