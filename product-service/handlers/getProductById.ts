import { APIGatewayProxyHandler } from 'aws-lambda';
import ProductService from '../services/product.service';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const response = {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: ''
  };

  console.log('getProductById lambda event:', JSON.stringify(event));

  try {
    const { id } = event.pathParameters;
    const product = await ProductService.getProductById(id);
    response.body = JSON.stringify(product, null, 2);
  } catch (error) {
    console.log('ERROR', error);
    response.statusCode = error.statusCode || 500;
    response.body = JSON.stringify(error, null, 2);
  }
  return response;
}