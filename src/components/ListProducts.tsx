import CardProduct from "@/components/CardProduct";
import { Product } from "@/interfaces/products";
import { supabase } from "@/lib/supabase/initSupabase";
import { mapProductList } from "@/utils/mappers";


// export default async function ListProducts({category, commigsoon}: {category?: string, commigsoon?: boolean}) {
export default async function ListProducts({products}: {products: Product[]}) {


    if (!products?.length) {
        return (
            <p className="text-center mt-4 text-gray-500 text-2xl">
                No hay productos para mostrar 🥺
            </p>
        );
    };

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: Product) => (
                <CardProduct key={product.id} product={product} />
            ))}
      </div>
    );
};