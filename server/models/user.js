import mongoose from 'config/mongoose'

const schema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean
    },
    verifyBySms: {
        type: Boolean
    },
    verifyByMail: {
        type: Boolean
    },
    langKey: {
        type: String,
        required: true
    },
    authorities: {
        type: [String]
    },
    createdBy: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedBy: {
        type: String
    },
    lastModifiedDate: {
        type: Date
    }
})

export default mongoose.model('User', schema)
