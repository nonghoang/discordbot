import {
    create,
    getAll
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
    res.status(200).json(users);
}
