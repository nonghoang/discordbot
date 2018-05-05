import Bluebird from 'bluebird'
import mongoose from 'mongoose'
import { MONGODB } from 'config/config'

mongoose.Promise = Bluebird
mongoose.connect(MONGODB, {
    promiseLibrary: Bluebird
})

export default mongoose
