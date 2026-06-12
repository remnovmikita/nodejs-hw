
import crypto from 'crypto';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/time.js';
import Session from '../models/session.js';

export const createSession = async (userId) => {
  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();

  const session = await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + accessTokenLifeTime),
    refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifeTime),
  });
  console.log(session);

  return session;
};
export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: accessTokenLifeTime,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: refreshTokenLifeTime,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: refreshTokenLifeTime,
  });
};
