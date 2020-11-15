import { newProductRequest, Product } from "../interfaces/product";
import { createProduct, getAllProducts, getProductById } from "../models";
import { HttpErrorService } from "./error.service";

class ProduceService {
    async getProductsList(): Promise<Product[]> {
        return await getAllProducts();
    }

    async getProductById(id: string): Promise<Product | undefined> {
        if (!id) {
            throw new HttpErrorService('Missing required parameter - id', 400);
        }
        return await getProductById(id);
    }

    async addNewProduct(newProduct: newProductRequest): Promise<void> {
        if (!newProduct.title || !newProduct.price) {
            throw new HttpErrorService('Missing required parameter/s - title or price', 400);
        }
        await createProduct(newProduct);
    }
}

const instance = new ProduceService();

export default instance;
