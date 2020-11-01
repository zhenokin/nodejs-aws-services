import products from '../db/productList.json';

interface Product {
    description: string;
    id: string;
    price: number;
    title: string;
    img: string;
}

class ProduceService {
    getProductsList(): Promise<Array<Product>> {
        return new Promise((res, rej) => {
            products && products.length ? res(products) : rej('There are no products');
        });
    }

    getProductById(id: string) {
        return new Promise((res, rej) => {
            if (products && products.length) {
                const product = products.find((el) => el.id === id);
                product && res(product);
            }
            rej(`There is no product by id: ${id}`);
        });
    }
}

const instance = new ProduceService();

export default instance;
