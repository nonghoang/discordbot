import {
    registerUser,
    updateUser,
    changePassword,
    resetPassword
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

    app.get('/account', isAuthenticated, getUserSigned);
    app.post('/account', isAuthenticated, updateUser);
    app.post('/account/change-password', isAuthenticated, changePassword);
    app.post('/account/reset-password/init', resetPassword);

    app.post('/register', registerUser);
    app.post('/authenticate', authenticate);

}
