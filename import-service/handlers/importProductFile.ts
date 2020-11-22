import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { BUCKET, REGION } from '../constants/constants';

export const importProductFile: APIGatewayProxyHandler = async (event, _context) => {
    const s3 = new AWS.S3({ region: REGION, signatureVersion: 'v4' });
    const { name } = event.queryStringParameters;
    const response = {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: ''
    };

    if (!name) {
        response.statusCode = 400;
        response.body = JSON.stringify({
            message: 'Missing required parameter - name'
        });
        return response;
    }

    try {
        const params = {
            Bucket: BUCKET,
            Key: `uploaded/${name}`,
            ContentType: 'text/csv',
            Expires: 60
        };
        const url = await s3.getSignedUrlPromise('putObject', params);
        response.body = JSON.stringify(url);
    } catch (error) {
        console.error(error);
        response.statusCode = 500;
        !!error.message && (response.body = JSON.stringify({ message: error.message }));
    }

    return response;
}