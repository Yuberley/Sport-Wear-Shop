import React, { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';
import ProducDetailsSkeleton from '@/skeletons';
import { Product } from '@/interfaces/products';
import { supabase } from '@/lib/supabase/initSupabase';
import { mapProduct } from '@/utils/mappers';
import { Color } from '@/interfaces';
import { Metadata } from 'next';
import { BASE_URL_THIS_WEBSITE } from '@/constants';

interface PageProps {
    searchParams?: {
        id: string;
        name: string;
    };
};

const productNotFound = (
    <p className="text-center mt-4 text-gray-500 text-2xl">
        Producto no encontrado 🥺
    </p>
);

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { id = '' } = searchParams || {};

    if (!id) {
        return {
            title: 'Producto no encontrado | YL SPORT',
            description: 'No se encontró el producto solicitado.',
            openGraph: {
                title: 'Producto no encontrado | YL SPORT',
                description: 'No se encontró el producto solicitado.',
                type: 'website',
                url: BASE_URL_THIS_WEBSITE,
            },
        };
    }

    const { data: productData } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    const product: Product = mapProduct(productData);

    if (!product) {
        return {
            title: 'Producto no encontrado | YL SPORT',
            description: 'No se encontró el producto solicitado.',
            openGraph: {
                title: 'Producto no encontrado | YL SPORT',
                description: 'No se encontró el producto solicitado.',
                type: 'website',
                url: BASE_URL_THIS_WEBSITE,
            },
        };
    }

    return {
        title: `${product.name} | YL SPORT`,
        description: product.description,
        openGraph: {
            title: `${product.name} | YL SPORT`,
            description: product.description,
            url: `${BASE_URL_THIS_WEBSITE}/product?id=${id}`,
            images: product.imagesSrc.length > 0 ? product.imagesSrc[0] : '/default-image.jpg',
        },
    };
}

export default async function Page({ searchParams }: PageProps) {
    const { id = ''} = searchParams || {};

    if (!id) {
        return productNotFound;
    }

    const [
        { data: productData, error: productError },
        { data: colorsData },
        { data: sizesData },
    ] = await Promise.all([
        supabase.from('products').select('*').eq('id', id).eq('is_available', true).single(),
        supabase.from('types_colors').select('*'),
        supabase.from('types_sizes').select('value'),
    ]);

    if (productError || !productData) {
        console.error('Error fetching product', productError);
        return productNotFound;
    }

    const product: Product = mapProduct(productData);
    const colorsSource: Color[] = colorsData || [];
    const sizesSource: string[] = sizesData?.map((size) => size.value) || [];

    console.log('Product details:', product);

    return (
        <Suspense fallback={<ProducDetailsSkeleton />}>
            <ProductDetails product={product} colorsSource={colorsSource} sizesSource={sizesSource} />
        </Suspense>
    );
}
