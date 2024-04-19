import { Suspense } from "react";
import ListProducts from "@/components/ListProducts";
import { ListProductsSkeleton } from "../skeletons";
import { cookies } from "next/headers";
import 'animate.css';

import type { Metadata } from "next";
import { Product } from "@/interfaces/products";
import { mapProductList } from "@/utils/mappers";
import { supabase } from "@/lib/supabase/initSupabase";

export const metadata: Metadata = {
    title: "YL SPORT | Tu tienda de ropa deportiva",
    description: "Tienda de ropa deportiva con los mejores precios y estilos",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
};


export default async function Home() {

    const cookieStore = cookies();

    const products: Product[] = [];
    
    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .eq('is_coming_soon', false);

    if (data) products.push(...mapProductList(data));

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-green-600 text-center mb-12">¡ Lista de productos !</h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts products={products}/>
                </Suspense>
            </div>
        </div>
    )
};
