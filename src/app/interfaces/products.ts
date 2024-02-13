export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    discount: number;
    newPrice: string;
    colors: string[];
    sizes: string[];
    category: string;
    imagesSrc: string[];
    isAvailable: boolean;
}

export interface ListProducts {
    products: Product[];
}
