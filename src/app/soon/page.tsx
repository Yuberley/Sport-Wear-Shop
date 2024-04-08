import ListProducts from '@/components/ListProducts';
import { ListProductsSkeleton } from '@/skeletons';
import React, { Suspense } from 'react';
import { cookies } from "next/headers";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "YL SPORT | Tu tienda de ropa deportiva",
    description: "Tienda de ropa deportiva con los mejores precios y estilos",
    applicationName: "YL SPORT",
    generator: "YL SPORT",
    keywords: ["Ropa deportiva", "Ropa", "Deportiva", "YL SPORT", "Gym", "Gimnasio", "Ejercicio", "Entrenamiento", "Fitness", "Moda", "Moda deportiva", "Moda fitness", "Moda gym"],
    creator: "Yudilexy Guerrero",
};

const ComingSoon = () => {

    const cookieStore = cookies();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-violet-600 text-center mb-12">¡ Productos próximamente disponibles !</h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts commigsoon={true} />
                </Suspense>
            </div>
        </div>
    )
}

export default ComingSoon;