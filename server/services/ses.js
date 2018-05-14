import AWS from 'config/aws'
import {
    AWS_EMAIL
} from 'config/config';

export const send = async (subject, toAddresses, textFormatBody) => {
    const ses = new AWS.SES({
        apiVersion: '2010-12-01'
    });

    const params = {
        Destination: {
            // CcAddresses: ccAddresses,
            ToAddresses: toAddresses
        },
        Message: {
            Body: {
                // Html: {
                //     Charset: "UTF-8",
                //     Data: htmlFormatBody
                // },
                Text: {
                    Charset: "UTF-8",
                    Data: textFormatBody
                    }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: AWS_EMAIL,
        ReplyToAddresses: [],
    }

    const data = await ses.sendEmail(params).promise();
    console.log('data', data);
}
