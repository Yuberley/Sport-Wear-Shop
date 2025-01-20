import React, { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';
import ProducDetailsSkeleton from "@/skeletons";
import { Product } from '@/interfaces/products';
import { supabase } from '@/lib/supabase/initSupabase';
import { mapProduct } from '@/utils/mappers';
import { Color } from '@/interfaces';
import { cookies } from "next/headers";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "YL SPORT | Tu tienda de ropa deportiva",
    description: "Los mejores precios y estilos. Encuentra la ropa que necesitas para tu entrenamiento en el gimnasio o al aire libre. Enterizos, tops, leggings, shorts, camisetas, tops y más. ¡Compra ya!",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
    publisher: "Yudilexy Guerrero",
    authors: [{url: "https://www.instagram.com/yudig_209/", name:"Yudilexy Guerrero"}],
};

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
        .eq('is_available', true)
        .single();

    if (error) {
        console.error('Error fetching product', error);
        return productNotFound;
    }

    product = mapProduct(data);

    if (!product) {
        return productNotFound;
    };

    let colorsSource: Color[] = [];
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