import {
    findByUserAndPassword,
    getUserById
} from 'services/user';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import {
    SESSION_SECRET,
    SESSION_TTL
} from 'config/config';
import { CODE } from 'config/message';

export async function authenticate(req, res, next) {
    let {
        username,
        password
    } = req.body;

    const user = await findByUserAndPassword(username, password);

    if (!user || !user.activated) {
        return res.status(409).json({
            message: CODE[409]
        });
    }

    const data = issueJWT(user);
    res.setHeader('authorization', `Bearer ${data.token}`);
    res.setHeader('access-control-allow-credentials', true);
    res.setHeader('access-control-expose-headers', 'Authorization, Link, X-Total-Count');

    res.status(200).json({
        id_token: data.token
    });
}

export const isAuthenticated = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(410).json({
            message: CODE[410]
        });
    }

    token = token.replace('Bearer ', '');
    const data = await verify(token);

    if (!data.token || !data.user) {
        return res.status(410).json({
            message: CODE[410]
        });
    }

    req._user = data.user;
    next();
}

export const getUserSigned = async (req, res, next) => {
    req._user.password = null;
    res.status(200).json(req._user);
}

export const create = async (user) => {
  return issueJWT(user)
}

export const issueJWT = (user) => {
    const payload = {
        _id: user._id
    }

    const token = jwt.sign(payload, SESSION_SECRET, {
        expiresIn: SESSION_TTL
    })

    return {
        token,
        ttl: ms(SESSION_TTL),
        user
    }
}

export const verify = async (token, refresh) => {
    const decoded = jwt.verify(token, SESSION_SECRET);

    if (!decoded) {
        return false;
    }

    const user = await getUserById(decoded._id);

    if (!user) {
        return false;
    }

    return refresh ? issueJWT(user) : {
        token,
        ttl: ms(SESSION_TTL),
        user
    };
}
