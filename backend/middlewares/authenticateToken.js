import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token after 'Bearer'

    if (!token) return res.status(401).json({ message: "Access token missing" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user; // user should contain { id: userId, email: userEmail, ... }
        next();
    });
};

export default authenticateToken;
