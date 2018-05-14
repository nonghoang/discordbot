import AWS from 'aws-sdk'
import bluebird from 'bluebird'
import {
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY
} from './config'

AWS.config.setPromisesDependency(bluebird)
AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY
})

export default AWS
