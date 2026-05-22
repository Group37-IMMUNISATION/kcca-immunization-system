const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {

        // Get token from headers

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                error: 'Access denied. No token provided.'
            });
        }

        // Extract token

        const token = authHeader.split(' ')[1];

        // Verify token

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user to request

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            error: 'Invalid token'
        });
    }
};

module.exports = authMiddleware;