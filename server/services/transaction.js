import Transaction from 'models/transaction'

export function create(options) {
    let {
        orderId,
        status
    } = options

    const transaction = new Transaction({
        orderId,
        status
    })

    return transaction.save()
}

export function findById(id) {
    return Transaction.findById(id)
}

export function updateStatus(id, status) {
    return Transaction.findByIdAndUpdate(id, {
        status: status
    })
}
