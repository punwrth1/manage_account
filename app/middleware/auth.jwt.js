const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, scKey.secret, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized" });

        req.userId = decoded.id;  // change from req.id to req.userId for clarity
        next();
    });
};

module.exports = verifyToken;
