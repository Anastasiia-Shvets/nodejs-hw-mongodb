import bcrypt from 'bcrypt';
import crypto, { randomBytes } from 'crypto';
import { User } from '../model/users.js';
import createHttpError from 'http-errors';
import { Sessions } from '../model/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../contacts/index.js';

const createSession = () => {
  return {
    accessToken: crypto.randomBytes(20).toString('base64'),
    refreshToken: crypto.randomBytes(20).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized!');
  }

  await Sessions.deleteOne({ userId: user._id });
  return await Sessions.create({
    userId: user._id,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Sessions.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};


export const refreshSession = async ({ sessionId, sessionToken }) => {
  const session = await Sessions.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found.');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Session token expired.');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'Session not found.');
  }

  const newSession = createSession();


  await Sessions.deleteOne({ _id: sessionId });

  return await Sessions.create({
    userId: user._id,
    ...newSession,
  });
};


