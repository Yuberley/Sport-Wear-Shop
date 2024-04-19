import ListProducts from "@/components/ListProducts";
import { Suspense } from "react";
import { ListProductsSkeleton } from "@/skeletons";
import { 
    notFound,
} from "next/navigation";
import { capitalizeFirstLetter } from "@/utils";
import { cookies } from "next/headers";
import { Product } from "@/interfaces/products";
import { supabase } from "@/lib/supabase/initSupabase";
import { mapProductList } from "@/utils/mappers";

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