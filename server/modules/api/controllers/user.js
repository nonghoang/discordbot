const Uuid = require('uuid');

import {
    create,
    update,
    findByUserAndPassword,
    updatePassword,
    findWithLogin,
    findWithEmail
} from 'services/user';

import {
    create as createActive
} from 'services/active';

import { send } from 'services/ses';
import { URL_VERIFY_EMAIL } from 'config/config';
import { CODE } from 'config/message';

export async function registerUser(req, res, next) {
    let {
        email,
        langKey,
        login,
        password
    } = req.body;

    const userLogin = await findWithLogin(login);

    if (userLogin) {
        return res.status(401).json({
            type: 'https://www.jhipster.tech/problem/login-already-used',
            message: CODE[401]
        });
    }

    const userEmail = await findWithEmail(email);

    if (userEmail) {
        return res.status(402).json({
            type: 'https://www.jhipster.tech/problem/email-already-used',
            message: CODE[402]
        });
    }

    const user = await create({
        login: login,
        password: password,
        email: email,
        activated: false,
        langKey: langKey
    });

    if (!user) {
        return res.status(501).json({
            message: CODE[501]
        });
    }

    handleSendMail(user);
    user.password = null;
    res.status(200).json({
        user: user
    });
}

export async function updateUser(req, res, next) {
    let {
        login,
        firstName,
        lastName,
        email,
        activated,
        langKey
    } = req.body;

    const user = await update(login, {
            $set: {
            login,
            firstName,
            lastName,
            email,
            activated,
            langKey
        }
    });

    if (!user) {
        return res.status(502).json({
            message: CODE[502]
        });
    }
    user.password = null;
    res.status(200).json({
        user: user
    });
}

export async function changePassword(req, res, next) {
    const userCurrent = req._user;
    let {
        currentPassword,
        newPassword
    } = req.body;

    const user = await findByUserAndPassword(userCurrent.login, currentPassword);

    if (!user) {
        return res.status(403).json({
            message: CODE[403]
        });
    }

    const updatedUser = await updatePassword(user.login, newPassword);

    if (!updatedUser) {
        return res.status(503).json({
            message: CODE[503]
        });
    }
    updatedUser.password = null;
    res.status(200).json({
        user: updatedUser
    });
}

export async function resetPassword(req, res, next) {
    let { email } = req.body;
    const user = await findWithEmail(email);

    if (!user) {
        return res.status(405).json({
            message: CODE[405]
        });
    }

    const newPassword = Uuid.v4();
    const updatedUser = await updatePassword(user.login, newPassword);

    if (!updatedUser) {
        return res.status(505).json({
            message: CODE[505]
        });
    }

    handleSendMailResetPassword(user, newPassword);

    updatedUser.password = null;
    res.status(200).json({
        user: updatedUser
    });
}

function handleSendMailResetPassword(user, password) {
    const body = `Signalleaks reset password. New password: ${password} with email: ${user.email}, username: ${user.login}`;

    send('Signalleaks reset password', [user.email], body);
}

async function handleSendMail(user) {
    const active = await createActive(user._id);
    const body = `Signalleaks verify email: ${URL_VERIFY_EMAIL}verify/${active._id}`;

    send('Signalleaks verify email', [user.email], body);
}
