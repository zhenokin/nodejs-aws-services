import { Client } from 'pg';

const dbOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
};

const getAllProducts = async (): Promise<Array<any>> => {
    const client = new Client(dbOptions);

    try {
        await client.connect();
        const results = await client.query(`
            SELECT p.id, p.title, p.description, p.img, p.price, s.count
            FROM products p
            LEFT JOIN stock s ON p.id = s.product_id
        `);
        return results ? results.rows : [];
    } catch (error) {
        console.log('[getAllProducts]: Connect to DB failed', error);
        throw error;
    } finally {
        await client.end()
    }
};

const getProductById = async (id: string): Promise<any | undefined> => {
    const client = new Client(dbOptions);

    try {
        await client.connect();
        const results = await client.query(`
        SELECT p.id, p.title, p.description, p.img, p.price, s.count
        FROM products p
        LEFT JOIN stock s ON p.id = s.product_id
        WHERE p.id = $1
    `, [id])
        return results && results.rows ? results.rows[0] : undefined;
    } catch (error) {
        console.error('[getProductById]: Connect to DB failed', error);
        throw error;
    } finally {
        await client.end();
    }
};

const createProduct = async (newProduct: any): Promise<void> => {
    const { title, description, price, img, count } = newProduct;
    console.log('[createProduct]:', JSON.stringify(newProduct));

    const client = new Client(dbOptions);

    try {
        await client.connect();
        await client.query('BEGIN');
        const results = await client.query(`
            INSERT INTO products (title, description, img, price)
            VALUES ($1, $2, $3, $4) RETURNING id
        `, [title, description, img, price]);

        await client.query(`
            INSERT INTO stock (count, product_id)
            VALUES ($1, $2)
        `, [count, results.rows[0].id]);
        await client.query('COMMIT');
    } catch (error) {
        console.error('[createProduct]: Connect to DB failed', error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
};

export {
    getAllProducts,
    getProductById,
    createProduct
}
