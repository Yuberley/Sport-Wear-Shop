import ListProducts from "@/components/client/products/ListProducts";
import { Suspense } from "react";
import { ListProductsSkeleton } from "@/skeletons";
import { notFound } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils";
import { cookies } from "next/headers";
import { Product } from "@/interfaces/Products";
import { supabase } from "@/lib/supabase/initSupabase";
import { mapProductList } from "@/utils/mappers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categoría | YL SPORT",
    description: "Encuentra la mejor ropa deportiva en YL SPORT. Contáctanos a través de nuestras redes sociales y conoce más sobre nuestros productos.",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
    publisher: "Yudilexy Guerrero",
    authors: [{url: "https://www.instagram.com/yudig_209/", name:"Yudilexy Guerrero"}],
};

export default async function Category(props: any) {

    const cookieStore = cookies();

    let { category } = props.params;
    let categoryTitle = '';
    let categorySlug = '';

    if (!category) {
        return notFound;
    }

    if (category) {
        categoryTitle = capitalizeFirstLetter(category.charAt(0).toUpperCase() + category.slice(1));
        categorySlug = category.split('-').join(' ');
    }

    const products: Product[] = [];
    
    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', categorySlug)
        .eq('is_available', true)
        .eq('is_coming_soon', false);

    if (data) products.push(...mapProductList(data));


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-500">
                Categoría - <span className="text-gray-900">
                        {categoryTitle}
                    </span>
                </h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts products={products} />
                </Suspense>
            </div>
        </div>
    )
};