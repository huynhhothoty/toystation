const { verifyAccessToken } = require('../../utils/auth/jwtHelper');

const authentication = async (req, res, next) => {
    verifyAccessToken(req, res, next);
};

module.exports = { authentication };
