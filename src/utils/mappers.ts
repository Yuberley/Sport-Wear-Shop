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
        gerder: product.gerder || '',
        unitPrice: product.unit_price || 0,
        unitCost: product.unit_cost || 0,
        currentStock: product.current_stock || 0,
        entryDate: product.entry_date || '',
        salePrice: product.sale_price || 0,
        createdAt: product.created_at || '', 
    }
}

export const mapProductList = (productList: any): Product[] => {
    return productList.map(
        (product: any) => mapProduct(product)
    )
}