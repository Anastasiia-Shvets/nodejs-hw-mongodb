import { REFRESH_TOKEN_LIFETIME } from '../contacts/index.js';
import { createUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
    const user = await loginUser(req.body);

    res.json({
        status: 200,
        message: 'User is logger in!',
        data: { user },
    });

    const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
    });
    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

