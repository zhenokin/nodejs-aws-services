import * as AWS from 'aws-sdk';
import { BUCKET, REGION } from '../constants/constants';
import csv from 'csv-parser';

export const importFileParser = (event, _context) => {
    const s3 = new AWS.S3({ region: REGION });
    const sqs = new AWS.SQS({ region: REGION });

    console.log('[importFileParser]: records:', event.Records);

    event.Records.forEach(record => {
        const s3Stream = s3.getObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
        }).createReadStream();

        s3Stream.pipe(csv())
            .on('data', data => {
                console.log('[importFileParser]: data:', data); 
                sqs.sendMessage({
                    QueueUrl: process.env.SQS_URL,
                    MessageBody: JSON.stringify(data)
                }, err => {
                    if (err) {
                        console.log('[importFileParser]: SQS error:', err);
                        return;
                    }
                    console.log('[importFileParser]: send message to SQS');
                });
            })
            .on('error', (err) => {
                console.error(err);
            })
            .on('end', async () => {
                console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

                await s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: `${BUCKET}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                await s3.deleteObject({
                    Bucket: BUCKET,
                    Key: record.s3.object.key
                }).promise();

                console.log(`Copied into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
            });
    });

}