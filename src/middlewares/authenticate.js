import createHttpError from 'http-errors';
import { Sessions } from '../model/session.js';
import { User } from '../model/users.js';

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
       return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const session = await Sessions.findOne({ accessToken: token });

    if (!session) {
        return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired =
        new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
        return next(createHttpError(401, 'Access token expired'));
    }

    const user = await User.findById(session.userId);

    if (!user) {
        return next(createHttpError(401, 'User associated with this session in not found!'));
    }

    req.user = user;
    next();
};
