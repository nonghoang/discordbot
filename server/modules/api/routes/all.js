import {
    createUser,
    registerUser,
    getUsers,
    updateUsers,
    changePassword
} from '../controllers/user'

import {
    authenticate,
    isAuthenticated,
    getUserSigned
} from '../controllers/auth'

export default app => {
    app.post('/user', createUser);
    app.get('/users', isAuthenticated, getUsers);
    app.post('/account', isAuthenticated, updateUsers);
    app.post('/account/change-password', isAuthenticated, changePassword);

    app.post('/register', registerUser);
    app.post('/authenticate', authenticate);

    app.get('/account', isAuthenticated, getUserSigned);
}
