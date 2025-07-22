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
    isFeatured: boolean;
    gender: string;
    unitPrice: string;
    unitCost: string;
    unitPriceWithDiscount: string;
    currentStock: string;
    entryDate: string;
    salePrice: string;
    createdAt: string;
};

export interface ListProducts {
    products: Product[];
};