import { 
    Category, 
    Color, 
    Product, 
    Size 
} from "@/interfaces";

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
        itemType: product.item_type || '',
        unitPrice: product.unit_price || 0,
        unitCost: product.unit_cost || 0,
        currentStock: product.current_stock || 0,
        entryDate: product.entry_date || '',
        salePrice: product.sale_price || 0,
        createdAt: product.created_at || '', 
        isFeatured: product.is_featured || false,
        unitPriceWithDiscount: product.unit_price_with_discount || 0,
    }
}

export const mapProductList = (productList: any): Product[] => {
    return productList.map(
        (product: any) => mapProduct(product)
    )
}

export const mapProductToApi = (product: Product): any => {
    return {
        name: product.name.trim(),
        description: product.description.trim(),
        price: product.price,
        discount: product.discount || null,
        colors: product.colors,
        sizes: product.sizes,
        category: product.category,
        source_image: product.imagesSrc,
        is_available: product.isAvailable,
        is_coming_soon: product.isComingSoon,
        item_type: product.itemType,
    }
}

export const mapCategory = (category: any): Category => {
    return {
        id: category.id || '',
        name: category.name || '',
        itemTypes: category.item_types || []
    }
}

export const mapCategoryList = (categories: any): Category[] => {
    return categories.map(
        (category: any) => mapCategory(category)
    )
}

export const mapColor = (color: any): Color => {
    return {
        id: color.id || '',
        name: color.name || '',
        value: color.value || ''
    }
}

export const mapColorList = (colors: any): Color[] => {
    return colors.map(
        (color: any) => mapColor(color)
    )
}

export const mapSize = (size: any): Size => {
    return {
        id: size.id || '',
        value: size.value || ''
    }
}

export const mapSizeList = (sizes: any): Size[] => {
    return sizes.map(
        (size: any) => mapSize(size)
    )
}