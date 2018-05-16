import {
    registerUser,
    updateUser,
    changePassword
} from '../controllers/user';
import {
    getUser,
    getUsers,
    getAuthorities,
    adminUpdateUser,
    deleteUser,
    adminCreateUser
} from '../controllers/admin/user'
import {
    authenticate,
    isAuthenticated,
    getUserSigned
} from '../controllers/auth';

export default app => {
    app.get('/users', isAuthenticated, getUsers);
    app.get('/users/authorities', isAuthenticated, getAuthorities);
    app.get('/users/:login', isAuthenticated, getUser);
    app.post('/users', isAuthenticated, adminCreateUser);
    app.put('/users', isAuthenticated, adminUpdateUser);
    app.delete('/users/:login', isAuthenticated, deleteUser);

    app.post('/account', isAuthenticated, updateUser);
    app.post('/account/change-password', isAuthenticated, changePassword);

    app.post('/register', registerUser);
    app.post('/authenticate', authenticate);

    app.get('/account', isAuthenticated, getUserSigned);
}
