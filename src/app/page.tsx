import { Suspense } from "react";
import ListProducts from "@/components/ListProducts";
import { ListProductsSkeleton } from "../skeletons";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Product } from "@/interfaces/products";
import { mapProductList } from "@/utils/mappers";
import { supabase } from "@/lib/supabase/initSupabase";
import 'animate.css';


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


export default async function Home() {

    const cookieStore = cookies();

    const columns: (keyof Product)[] = ['id', 'name', 'price', 'category'];

    const products: Product[] = [];
    
    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .eq('is_coming_soon', false);

    if (data) products.push(...mapProductList(data));

    // Barajar los productos usando Fisher-Yates (Durstenfeld)
    for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
    }

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
