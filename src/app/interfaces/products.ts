export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    colors: string[];
    sizes: string[];
    imagesSrc: string[];
}

export interface ListProducts {
    products: Product[];
}
