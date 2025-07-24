import { Product } from "@/interfaces";

export const isProductValid = (product: Product): boolean => {
    if (
        !product.name || 
        !product.description || 
        !product.price ||
        !product.category ||
        !product.colors.length ||
        !product.sizes.length
    ) {
        return false;
    }

    if (product.discount && (Number(product.discount) < 0 || Number(product.discount) > 100)) {
        return false;
    }

    return true;
}