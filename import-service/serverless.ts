import type { Serverless } from 'serverless/aws';
import { BUCKET } from './constants/constants';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'import-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: 's3:ListBucket',
      Resource: [`arn:aws:s3:::${BUCKET}`]
    }, {
      Effect: 'Allow',
      Action: 's3:*',
      Resource: [`arn:aws:s3:::${BUCKET}/*`]
    },]
  },
  functions: {
    importProductFile: {
      handler: 'handler.importProductFile',
      events: [
        {
          http: {
            method: 'get',
            path: '/import',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  name: true
                }
              }
            }
          }
        }
      ]
    },
    importFileParser: {
      handler: 'handler.importFileParser',
      events: [
        {
          s3: {
            bucket: BUCKET,
            event: 's3:ObjectCreated:*',
            rules: [{
              prefix: 'uploaded/',
              suffix: '.csv'
            }],
            existing: true
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
