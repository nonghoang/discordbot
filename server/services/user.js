import bcrypt from 'bcrypt';
import User from 'models/user';
import { SALTROUNDS } from 'config/config';

export async function create(options) {
    let { password } = options;
    const passwordHash = await bcrypt.hash(password, SALTROUNDS);

    const user = new User({
        ...options,
        authorities: ['ROLE_USER', 'ROLE_ADMIN'],
        password: passwordHash
    });

    return user.save();
}

export async function findByUserAndPassword(login, password) {
    const user = await findWithLogin(login);

    if (!user) {
        return false;
    }

    const res = await bcrypt.compare(password, user.password);
    if (!res) {
        return false;
    }

    return user;
}

export function findWithLogin(login) {
    return User.findOne({login: login});
}

export function findWithEmail(email) {
    return User.findOne({email: email});
}

export function getUserById(id) {
    return User.findById(id);
}

export function getUserQuery(page, size, sort) {
    return User.find({}, {}, {
        skip: parseInt(page),
        limit: parseInt(size)
    }).sort(sort).exec();
}

export function update(login, query) {
    return User.update({
        login: login
    }, query).exec();
}

export function activeUser(id) {
    return User.findByIdAndUpdate(id, {
        activated: true
    }).exec();
}

export async function updatePassword(login, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, SALTROUNDS);

    return User.update({
        login: login
    }, {$set: {
        password: passwordHash
    }}).exec();
}
