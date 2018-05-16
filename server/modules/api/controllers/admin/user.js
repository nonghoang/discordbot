import {
    create,
    getUserQuery,
    update,
    findWithLogin,
    findByIdAndUpdate,
    removeUser
} from 'services/user';
import {
    create as createActive
} from 'services/active';
import {
    AUTHORITIES
} from 'config/config';

import { parseSort } from 'services/util';

export async function getUser(req, res, next) {
    let login = req.params.login;
    let user = await findWithLogin(login);

    if (!user) {
        return res.status(400).json({error: 'Error'});
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
    res.setHeader('access-control-expose-headers', 'Authorization, Link, X-Total-Count');
    res.setHeader('x-total-count', users.length);
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
        return res.status(500).json({
            message: 'error.updateUser',
            path: '/api/users',
            status: 400,
            title: 'Update user error'
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

    const password = '123456';

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
        return res.status(500).json({
            message: 'error.createUser',
            path: '/api/users',
            status: 400,
            title: 'Create user error'
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
        return res.status(500).json({
            message: 'error.deleteUser',
            path: '/api/users',
            status: 400,
            title: 'Delete user error'
        });
    }

    const data = await removeUser(user._id);
    res.setHeader('x-sudicapp-alert', 'userManagement.deleted');
    res.setHeader('x-sudicapp-params', 'user');
    return res.status(200).json({
        user: data
    });
}
