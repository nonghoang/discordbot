import {
    create as createOrder,
    orderDetail as getOrder
} from '../controllers/order'

import {
    createTransaction,
    transactionDetail,
    updateStatusTransaction
} from '../controllers/transaction'

export default app => {
    app.post('/order', createOrder);
    app.get('/order/:id', getOrder);
    app.post('/transaction', createTransaction);
    app.get('/transaction/:id', transactionDetail);
    app.put('/transaction/status', updateStatusTransaction);
}
