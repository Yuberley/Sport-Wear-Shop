import ListProducts from "./components/ListProducts";
import { getProducts } from "./../lib/GoogleSheets";

export default async function Home() {

    const products = await getProducts();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de productos</h2>

                <ListProducts products={products} />

            </div>
        </div>
    )
}
