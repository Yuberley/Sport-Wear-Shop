import ListProducts from "@/components/ListProducts";
import { Suspense } from "react";
import { ListProductsSkeleton } from "@/skeletons";
import { 
    notFound,
} from "next/navigation";
import { capitalizeFirstLetter } from "@/utils";

export default async function Category(props: any) {

    let { category } = props.params;
    if (category) {
        category = capitalizeFirstLetter(category);
    }

    if (!category) {
        return notFound;
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-500">
                Categoría - <span className="text-gray-900">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                </h2>
                <Suspense
                    fallback={<ListProductsSkeleton />}
                >
                    <ListProducts category={category} />
                </Suspense>
            </div>
        </div>
    )
};