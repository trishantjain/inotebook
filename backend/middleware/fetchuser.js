const jwt = require('jsonwebtoken');
const JWT_SECRET = "trishantkaiseho@88"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).json({ error: "Please authonticate using correct token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authonticate using correct token" })

    }


}



module.exports = fetchuser