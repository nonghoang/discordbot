import mongoose from 'config/mongoose'

const schema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    status: {
        type: String,
        required: true,
        default: 'new',
        lowercase: true
    },
    paymentTime: {
        type: Date
    },
    confirmTime: {
        type: Date
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Transaction', schema)
