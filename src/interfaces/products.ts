export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    discount: string;
    newPrice: string;
    colors: string[];
    sizes: string[];
    category: string;
    imagesSrc: string[];
    isAvailable: boolean;
    isComingSoon: boolean;
    createdAt: string;
};

export interface ListProducts {
    products: Product[];
};