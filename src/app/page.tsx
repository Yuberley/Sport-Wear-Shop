import { Suspense } from "react";
import ListProducts from "@/components/ListProducts";
import { ListProductsSkeleton } from "../skeletons";
import { cookies } from "next/headers";

import type { Metadata } from "next";

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

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de productos</h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts />
                </Suspense>
            </div>
        </div>
    )
};
