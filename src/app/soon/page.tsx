import ListProducts from '@/components/ListProducts';
import { ListProductsSkeleton } from '@/skeletons';
import React, { Suspense } from 'react';
import { cookies } from "next/headers";
import { supabase } from '@/lib/supabase/initSupabase';
import { Product } from '@/interfaces/products';
import { mapProductList } from '@/utils/mappers';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Productos próximamente disponibles | YL SPORT",
    description: "Los mejores precios y estilos. Encuentra la ropa que necesitas para tu entrenamiento en el gimnasio o al aire libre. Enterizos, tops, leggings, shorts, camisetas, tops y más. ¡Compra ya!",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
    publisher: "Yudilexy Guerrero",
    authors: [{url: "https://www.instagram.com/yudig_209/", name:"Yudilexy Guerrero"}],
};

const ComingSoon = async () => {

    const cookieStore = cookies();

    const products: Product[] = [];
    
    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_coming_soon', true);

    if (data) products.push(...mapProductList(data));

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-violet-600 text-center mb-12">¡ Productos próximamente disponibles !</h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts products={products} />
                </Suspense>
            </div>
        </div>
    )
}

export default ComingSoon;