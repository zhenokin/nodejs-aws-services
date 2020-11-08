import { APIGatewayProxyHandler } from 'aws-lambda';
import ProductService from '../services/product.service';

export const getProductsList: APIGatewayProxyHandler = async (event, _context) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  };

  console.log('getProductsList lambda event:', JSON.stringify(event));

  try {
    const products = await ProductService.getProductsList();
    response.body = JSON.stringify(products, null, 2);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(error, null, 2);
  }
  return response;
}
