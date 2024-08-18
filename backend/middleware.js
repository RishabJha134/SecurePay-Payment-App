const  JWT_SECRET  = require("./config")
// console.log(JWT_SECRET)
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("authHeader"+authHeader)


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];
    // console.log("token" + token)

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log("decoded"+decoded);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};



module.exports = {
    authMiddleware
}


