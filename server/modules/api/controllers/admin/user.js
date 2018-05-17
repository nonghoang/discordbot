import {
    create,
    getUserQuery,
    update,
    findWithLogin,
    findByIdAndUpdate,
    removeUser,
    getAll
} from 'services/user';
import {
    create as createActive
} from 'services/active';
import {
    AUTHORITIES,
    PASSWORD_DEFAULT
} from 'config/config';
import { CODE } from 'config/message';

import { parseSort } from 'services/util';

export async function getUser(req, res, next) {
    let login = req.params.login;
    let user = await findWithLogin(login);

    if (!user) {
        return res.status(411).json({
            message: CODE[411]
        });
    }
    user.password = null;
    res.status(200).json(user);
}

export async function getUsers(req, res, next) {
    const page = req.query.page;
    const size = req.query.size;
    const items = req.query.sort;
    const sort = parseSort(items);

    const users = await getUserQuery(page, size, sort);
    const allUser = await getAll();

    res.setHeader('access-control-expose-headers', 'Authorization, Link, X-Total-Count');
    res.setHeader('x-total-count', allUser.length);

    res.status(200).json(users);
}

export function getAuthorities(req, res, next) {
    res.status(200).json(AUTHORITIES);
}

export async function adminUpdateUser(req, res, next) {
    let {
        login,
        firstName,
        lastName,
        email,
        activated,
        langKey,
        authorities
    } = req.body;

    const user = await findByIdAndUpdate(req.body._id, {
        login,
        firstName,
        lastName,
        email,
        activated,
        langKey,
        authorities
    });

    if (!user) {
        return res.status(507).json({
            message: CODE[507]
        });
    }
    user.password = null;
    res.status(200).json({
        user: user
    });
}

export async function adminCreateUser(req, res, next) {
    let {
        login,
        firstName,
        lastName,
        email,
        activated,
        langKey,
        authorities
    } = req.body;

    const password = PASSWORD_DEFAULT;

    const user = await create({
        password,
        login,
        firstName,
        lastName,
        email,
        activated,
        langKey,
        authorities
    });

    if (!user) {
        return res.status(408).json({
            message: CODE[408]
        });
    }
    user.password = null;
    res.status(200).json({
        user: user
    });
}

export async function deleteUser(req, res, next) {
    let login = req.params.login;
    let user = await findWithLogin(login);

    if (!user) {
        return res.status(506).json({
            message: CODE[506]
        });
    }

    const data = await removeUser(user._id);
    res.setHeader('x-sudicapp-alert', 'userManagement.deleted');
    res.setHeader('x-sudicapp-params', 'user');
    return res.status(200).json({
        user: data
    });
}
