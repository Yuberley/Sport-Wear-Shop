import { Product } from "@/interfaces/products";

export const mapProduct = (product: any): Product => {
    return {
        id: product.id || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        discount: product.discount || '',
        newPrice: product.new_price || 0,
        colors: product.colors || [],
        sizes: product.sizes || [],
        category: product.category || '',
        imagesSrc: product.source_image || [],
        isAvailable: product.is_available || false,
        isComingSoon: product.is_coming_soon || false,
        createdAt: product.created_at || '', 
    }
}

export const mapProductList = (productList: any): Product[] => {
    return productList.map(
        (product: any) => mapProduct(product)
    )
}