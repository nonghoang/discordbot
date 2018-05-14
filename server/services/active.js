import Active from 'models/active';
const Uuid = require('uuid');

export function create(userId) {
    const active = new Active({
        userId: userId,
        key: Uuid.v4(),
        time: Date.now()
    })

    return active.save()
}

export function findById(id) {
    return Active.findById(id)
}
