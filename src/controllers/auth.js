import { REFRESH_TOKEN_LIFETIME } from '../contacts/index.js';
import {
  createUser,
  logoutUser,
  refreshSession,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { loginUser } from '../services/auth.js';

const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
  res.cookie('sessionToken', session.refreshToken, {
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

export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'User is logger in!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser({
      sessionId: req.cookies.sessionId,
      sessionToken: req.cookies.sessionToken,
    });
  }

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshSession({ sessionId, sessionToken });

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.status(200).json({
    status: res.status,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).json({
    status: res.status,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
