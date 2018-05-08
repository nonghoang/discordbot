import {
    create as createOrder,
    orderDetail as getOrder
} from '../controllers/order'

import {
    createTransaction,
    transactionDetail,
    updateStatusTransaction
} from '../controllers/transaction'

import {
    createUser,
    registerUser
} from '../controllers/user'

import {
    authenticate,
    isAuthenticated,
    getUserSigned
} from '../controllers/auth'

export default app => {
    app.post('/order', createOrder);
    app.get('/order/:id', getOrder);

    app.post('/transaction', createTransaction);
    app.get('/transaction/:id', transactionDetail);
    app.put('/transaction/status', updateStatusTransaction);

    app.post('/user', createUser);
    app.post('/register', registerUser);
    app.post('/authenticate', authenticate);

    app.get('/account', isAuthenticated, getUserSigned);
}
