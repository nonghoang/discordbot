import { createOrder, getOrder } from 'services/order'
import { create as createTransaction } from 'services/transaction'
import config from 'config/config'

export async function create(req, res, next) {
    let {
        elaAmount,
        exchangeRate,
        queryTime,
        orderDesc,
        businessName,
        orderName,
        currency,
        price,
        callbackUrl,
        returnUrl,
        email,
        walletAddress
    } = req.body

    if (!elaAmount ||
        !exchangeRate ||
        !queryTime ||
        !orderDesc ||
        !businessName ||
        !orderName ||
        !currency ||
        !price ||
        !callbackUrl ||
        !returnUrl ||
        !email ||
        !walletAddress) {
        return res.status(400).json({error: 'Missing params'});
    }

    const order = await createOrder({
        elaAmount,
        exchangeRate,
        queryTime,
        orderDesc,
        businessName,
        orderName,
        currency,
        price,
        callbackUrl,
        returnUrl,
        email,
        walletAddress
    })

    if (!order) {
        return res.status(500).json({error: 'Error'});
    }

    const transaction = await createTransactionWithOrder(order._id)

    if (!transaction) {
        return res.status(500).json({error: 'Error'});
    }

    res.status(200).json({
        order: order,
        transaction: transaction
    })
}

export async function orderDetail(req, res, next) {
    let { id } = req.params

    const order = await getOrder(id)

    if (!order) {
        return res.status(500).json({error: 'Error'});
    }
    res.status(200).json({order: order})
}

async function createTransactionWithOrder(orderId) {
    return await createTransaction({
        orderId: orderId,
        status: 'new'
    })
}
