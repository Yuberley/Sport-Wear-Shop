import { Product } from '@/interfaces/products';
import { supabase } from '@/lib/supabase/initSupabase';
import { mapProductList } from '@/utils/mappers';
import { toast } from 'sonner';

export const SerchProductsByName = async (searchProductName: string): Promise<Product[]> => {
    let { data: productList, error } = await supabase
        .from('products')
        .select('*')
        .textSearch('name', searchProductName, { 
            type: 'websearch'
        });

    if (error) {
        toast.error('Error searching for products');
        return [];
    }
    
    const productsMapped = mapProductList(productList)
    return productsMapped || [];
}

export const GetProductsWithPagination = async (page: number, rowsPerPage: number): Promise<{ productList: Product[], count: number }> => {
    const from = (page - 1) * rowsPerPage;
    const to = from + rowsPerPage - 1;
    
    let { data: productList, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });        
    
    if (error) {
        toast.error('Error getting products');
        return { productList: [], count: 0 };
    }
    const mappedProducts = mapProductList(productList);
    return { productList: mappedProducts, count: count || 0 };
}


export const SearhProductById = async (productId: string): Promise<Product | null> => {
    let { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

    if (error) {
        toast.error('Error searching for product');
        return null;
    }

    const productMapped = mapProductList([product])[0];
    return productMapped || null;
}
