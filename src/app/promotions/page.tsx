import ListProducts from '@/components/client/products/ListProducts';
import { Product } from '@/interfaces/Products';
import { supabase } from '@/lib/supabase/initSupabase';
import { ListProductsSkeleton } from '@/skeletons';
import { mapProductList } from '@/utils/mappers';
import React, { Suspense } from 'react'
import { cookies } from "next/headers";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Promociones | YL SPORT",
    description: "Encuentra la mejor ropa deportiva en YL SPORT. Contáctanos a través de nuestras redes sociales y conoce más sobre nuestros productos.",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
    publisher: "Yudilexy Guerrero",
    authors: [{url: "https://www.instagram.com/yudig_209/", name:"Yudilexy Guerrero"}],
};

const Promotions = async () => {

    const cookieStore = cookies();

    const products: Product[] = [];

    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .gt('discount', 0);

    if (data) products.push(...mapProductList(data));

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-red-600 text-center mb-12">¡ Nuestras promociones !</h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts products={products} />
                </Suspense>
            </div>
        </div>
    )
}

export default Promotions