import ListProducts from "@/app/components/ListProducts";
import { Suspense } from "react";
import { ListProductsSkeleton } from "../app/skeletons";
import { getProductsCached } from "@/lib/GoogleSheets";
import { getColors, getSizes, getCategories } from "@/lib/GoogleSheets/lists";
import { cookies } from "next/headers";

export default async function Home() {

    const cookieStore = cookies();

    getProductsCached();
    getCategories();
    getColors();
    getSizes();

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
