import CardProduct from "./CardProduct";
import { Product } from "../interfaces/products";

interface ListProductsProps {
    handleProductClick?: (product: Product) => void;
    products: Product[];
}

const ListProducts = ({ products, handleProductClick }: ListProductsProps) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: Product) => (
                <CardProduct key={product.id} product={product} />
            ))}
      </div>
    );
};

export default ListProducts;


    