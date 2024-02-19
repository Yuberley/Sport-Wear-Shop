import React from 'react'
import ProductDetails from '../components/ProductDetails';
import { getProductById } from '@/lib/GoogleSheets';
import { getColors, getSizes } from '@/lib/GoogleSheets/lists';

interface PageProps {
    searchParams?: {
        id: string;
        name: string;
    }
};

const productNotFound = (
    <p className="text-center mt-4 text-gray-500 text-2xl">
        Producto no encontrado 🥺
    </p>
);

export default async function Page({ searchParams }: PageProps) {

    const id = searchParams?.id?.toString() || '';
    const name = searchParams?.name?.toString() || '';

    if (!id || !name) {
        return productNotFound;
    };

    const product = await getProductById(id);

    if (!product) {
        return productNotFound;
    };

    const colorsSource = await getColors();
    const sizesSource = await getSizes();

    return (
        <>
            <ProductDetails product={product} colorsSource={colorsSource} sizesSource={sizesSource} />
        </>
    );
};