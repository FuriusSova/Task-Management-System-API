const jwt = require("jsonwebtoken");

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        return accessToken;
    }
    validateToken(token) {
        if (token) {
            try {
                const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
                return data;
            } catch (error) {
                return error;
            }
        } else {
            return null;
        }
    }
}

module.exports = new TokenService();