// "use client";
// import { useState } from "react";
import ListProducts from "./components/ListProducts";
import { getProducts } from "./../lib/GoogleSheets";
// import { products } from "./data";
import { Product } from "./interfaces/products";
import ProductDialog from "./components/ProductDialog";

export default async function Home() {

    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleProductClick = (product: Product) => {
        // setSelectedProduct(product);
        // setIsDialogOpen(true);
        // console.log('product', product);
        // console.log('isDialogOpen', isDialogOpen);
    };

    const products = await getProducts();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de productos</h2>

                <ListProducts products={products} />

                {/* {
                    products.length === 0 && (
                        <p className="mt-4 text-gray-500">No hay productos disponibles</p>
                    )
                }

                {
                    selectedProduct && (
                        <ProductDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} product={selectedProduct} />
                    )
                } */}


            </div>
        </div>
    )
}
