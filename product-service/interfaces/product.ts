export type Product = {
    description: string;
    id: string;
    price: number;
    title: string;
    img: string;
    count: number;
};

export type newProductRequest = {
    description: string;
    price: number;
    title: string;
    img: string;
    count: number;
};