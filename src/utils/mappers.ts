import { Product } from "@/interfaces/products";

export const mapProduct = (product: any): Product => {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        newPrice: product.new_price,
        colors: product.colors,
        sizes: product.sizes,
        category: product.category,
        imagesSrc: product.source_image,
        isAvailable: product.is_available,
        isComingSoon: product.is_coming_soon,
        createdAt: product.created_at, 
    }
}

export const mapProductList = (productList: any): Product[] => {
    return productList.map(
        (product: any) => mapProduct(product)
    )
}