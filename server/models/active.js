import mongoose from 'config/mongoose'

const schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    key: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Active', schema)
