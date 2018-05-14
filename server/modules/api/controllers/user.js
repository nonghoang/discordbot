import {
    create,
    getAll,
    update,
    findByUserAndPassword,
    updatePassword,
    findWithLogin,
    findWithEmail
} from 'services/user';

export async function createUser(req, res, next) {
    let {
        login,
        password,
        firstName,
        lastName,
        email,
        activated,
        langKey,
        createdBy
    } = req.body;

    const user = await create({
        login,
        password,
        firstName,
        lastName,
        email,
        activated,
        langKey,
        createdBy
    });

    if (!user) {
        return res.status(500).json({error: 'Error'});
    }
    res.status(200).json({
        user: user
    });
}

export async function registerUser(req, res, next) {
    let {
        email,
        langKey,
        login,
        password
    } = req.body;

    const userLogin = await findWithLogin(login);

    if (userLogin) {
        return res.status(400).json({
            type: 'https://www.jhipster.tech/problem/login-already-used'
        });
    }

    const userEmail = await findWithEmail(email);

    if (userEmail) {
        return res.status(400).json({
            type: 'https://www.jhipster.tech/problem/email-already-used'
        });
    }

    const user = await create({
        login: login,
        password: password,
        email: email,
        activated: true,
        langKey: langKey
    });

    if (!user) {
        return res.status(500).json({error: 'Error'});
    }
    res.status(200).json({
        user: user
    });
}

export async function getUsers(req, res, next) {
    const users = await getAll();
    res.setHeader('access-control-expose-headers', 'Authorization, Link, X-Total-Count');
    res.setHeader('x-total-count', users.length);
    // res.setHeader('link', 'api/users?page=0&size=20');
    res.status(200).json(users);
}

export async function updateUsers(req, res, next) {
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
        return res.status(500).json({error: 'Error'});
    }
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
        return res.status(400).json({
            message: 'Change password fail',
            status: 400,
        });
    }

    const updatedUser = updatePassword(user.login, newPassword);

    if (!updatedUser) {
        return res.status(500).json({error: 'Error'});
    }
    res.status(200).json({
        user: updatedUser
    });
}
