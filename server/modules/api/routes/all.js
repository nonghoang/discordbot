import elaprices from 'modules/api/controllers/elaprice'
import querytx from 'modules/api/controllers/querytx'
import subscribewithdetails from 'modules/api/controllers/subscriptiondetails'
import subscribewithtx from 'modules/api/controllers/subscriptionhash'
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

    app.get('/getamountinela', elaprices.details);
    app.get('/gettxdetails', querytx.details);
    app.post('/postdetailsforcallback', subscribewithdetails.details);
    app.post('/posttxdetailsforcallback', subscribewithtx.details);
}
