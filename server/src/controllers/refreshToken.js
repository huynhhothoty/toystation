const { signAccessToken, signRefreshToken } = require('../utils/auth/jwtHelper');

const refreshAccessToken = (req, res, next) => {
    try {
        // get info from middleware
        const testAccount = req.user;
        const isRemember = req.isRemember;

        // create token and set cookie
        const cookieExpired = isRemember
            ? new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
            : null;

        const accessToken = signAccessToken({
            _id: testAccount._id,
            role: testAccount.role,
            email: testAccount.email,
            name: testAccount.name,
        });
        const refreshToken = signRefreshToken({ _id: testAccount._id, isRemember });
        const ATCookieOptions = {
            expires: cookieExpired,
            httpOnly: true,
        };
        const RTCookieOptions = {
            expires: cookieExpired,
            httpOnly: true,
            path: '/api/user/refreshtoken',
        };
        if (process.env.NODE_ENV === 'production') {
            ATCookieOptions.secure = true;
            RTCookieOptions.secure = true;
        }

        res.cookie('accessToken', accessToken, ATCookieOptions);
        res.cookie('refreshToken', refreshToken, RTCookieOptions);

        res.status(200).send({
            status: 'ok',
            message: 'Refresh ok and gain new access token',
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { refreshAccessToken };
