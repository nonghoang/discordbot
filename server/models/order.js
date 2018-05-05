import mongoose from 'config/mongoose'

const schema = mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    elaAmount: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    exchangeRate: {
        type: Number,
        required: true,
    },
    queryTime: {
        type: Date,
        required: true,
    },
    orderName: {
        type: String,
        required: true,
    },
    orderDesc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    callbackUrl: {
        type: String,
        required: true,
    },
    returnUrl: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('Order', schema)
