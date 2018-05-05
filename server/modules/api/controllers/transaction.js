import { create, findById, updateStatus } from 'services/transaction'
import config from 'config/config'

export async function createTransaction(req, res, next) {
    let {
        orderId,
        status
    } = req.body

    const transaction = await create({
        orderId,
        status
    })

    if (!transaction) {
        return res.status(500).json({error: 'Error'})
    }
    res.status(200).json({transaction: transaction})
}

export async function transactionDetail(req, res, next) {
    let { id } = req.params

    const transaction = await findById(id)

    if (!transaction) {
        return res.status(500).json({error: 'Error'});
    }
    res.status(200).json({transaction: transaction})
}

export async function updateStatusTransaction(req, res, next) {
    let { id, status} = req.body

    const transaction = await updateStatus(id, status)

    if (!transaction) {
        return res.status(500).json({error: 'Error'})
    }
    res.status(200).json()
}
