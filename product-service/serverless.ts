import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
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
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      SQS_URL: {
       Ref: 'SQSQueue'
      },
      SNS_ARN: {
        Ref: 'SNSTopic'
      }
    },
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: 'sqs:*',
      Resource: {
        "Fn::GetAtt" : [ "SQSQueue", "Arn" ]
      }
    }, {
      Effect: 'Allow',
      Action: 'sns:*',
      Resource: {
        Ref: 'SNSTopic'
      }
    }]
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'product-service-sqs-queue'
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'product-service-sns-topic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'rsstestemailtasks@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          }
        }
      }
    },
    Outputs: {
      SQSUrl: {
        Value: {
          "Ref" : "SQSQueue"
        }
      },
      SQSArn: {
        Value: {
          "Fn::GetAtt" : [ "SQSQueue", "Arn" ]
        }
      }
    }
  },
  functions: {
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: '/products',
            cors: true
          }
        }
      ]
    },
    getProductById: {
      handler: 'handler.getProductById',
      events: [{
          http: {
            method: 'get',
            path: '/products/{id}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  id: true
                }
              }
            }
          }
        }]
    },
    addNewProduct: {
      handler: 'handler.addNewProduct',
      events: [{
        http: {
          path: '/products',
          method: 'post',
          cors: true
        }
      }]
    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [{
        sqs: {
          batchSize: 5,
          arn: {
            "Fn::GetAtt" : [ "SQSQueue", "Arn" ]
          }
        }
      }]
    }
  }
}

module.exports = serverlessConfiguration;
