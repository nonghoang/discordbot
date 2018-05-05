import mongoose from 'config/mongoose';

const schema = mongoose.Schema({
    attachments: {
        type: String
    },
    timestamp: {
        type: Date
    },
    mention_everyone: {
        type: Boolean
    },
    discordId: {
        type: String
    },
    pinned: {
        type: Boolean
    },
    posted: {
        type: Boolean
    },
    edited_timestamp: {
        type: Date
    },
    author: {
        type: String
    },
    content: {
        type: String
    },
    channel_id: {
        type: String
    },
    created_date: {
        type: Date
    }
});

export default mongoose.model('Message', schema);
