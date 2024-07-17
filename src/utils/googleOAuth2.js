import { OAuth2Client } from 'google-auth-library';
import checkEnvFor from './env.js';
import createHttpError from 'http-errors';
import { GOOGLE } from '../contacts/index.js';
import path from 'node:path';
import { readFile } from 'fs/promises';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
    clientId: checkEnvFor(GOOGLE.CLIENT_ID),
    clientSecret: checkEnvFor(GOOGLE.CLIENT_SECRET),
    redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () =>
    googleOAuthClient.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    });

export const validateCode = async (code) => {
    const response = await googleOAuthClient.getToken(code);
    if (!response.tokens.id_token)
        throw createHttpError(401, 'Unauthorized');
    const ticket = await googleOAuthClient.verifyIdToken({
        idToken: response.tokens.id_token,
    });
    return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
    let fullName = 'Guest';
    if (payload.given_name && payload.family_name) {
        fullName = `${payload.given_name} ${payload.family_name}`;
    } else if (payload.given_name) {
        fullName = payload.given_name;
    }
    return fullName;
};