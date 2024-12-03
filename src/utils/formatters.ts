

// in: 2024-04-16T06:03:41.924743+00:00 out: 16/04/2024
export const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-CO');
}

// in: 90000 out: $90.000
export const formatPrice = (price: string) => {
    if (!price) return '';
    return `$${price.toLocaleString()}`;
}

// in: 15 out: 15%
export const formatDiscount = (discount: string) => {
    if (!discount) return '';
    return `${discount}%`;
}