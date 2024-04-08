import React, { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';
import ProducDetailsSkeleton from "@/skeletons";
import { Product } from '@/interfaces/products';
import { supabase } from '@/lib/supabase/initSupabase';
import { mapProduct } from '@/utils/mappers';
import { color } from '@/interfaces';
import { cookies } from "next/headers";

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

    const cookieStore = cookies();

    const id = searchParams?.id?.toString() || '';
    const name = searchParams?.name?.toString() || '';

    if (!id || !name) {
        return productNotFound;
    };

    let product: Product;

    let { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product', error);
        return productNotFound;
    }

    product = mapProduct(data);

    if (!product) {
        return productNotFound;
    };

    let colorsSource: color[] = [];
    let sizesSource: string[] = [];

    const { data: colorsData, error: colorsError } = await supabase
        .from('types_colors')
        .select('*');

        
    if (colorsError) {
        console.error('Error fetching colors', colorsError);
    }
    
    if (colorsData) {
        colorsSource = colorsData;
    }
    
    const { data: sizesData, error: sizesError } = await supabase
        .from('types_sizes')
        .select('value');
    
    if (sizesError) {
        console.error('Error fetching sizes', sizesError);
    }
    
    if (sizesData) {
        sizesSource = sizesData.map((size: any) => size.value);
    }

    return (
        // <ProducDetailsSkeleton />
        <Suspense fallback={<ProducDetailsSkeleton />}>
            <ProductDetails product={product} colorsSource={colorsSource} sizesSource={sizesSource} />
        </Suspense>
    );
};