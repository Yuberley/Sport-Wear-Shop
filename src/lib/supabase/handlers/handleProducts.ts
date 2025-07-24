import { NAME_BUCKET_IMAGES, STORAGE_OBJECT_PUBLIC_IMAGES } from '@/constants';
import { SUPABASE_URL } from '@/environment';
import { Product } from '@/interfaces/Products';
import { supabase } from '@/lib/supabase/initSupabase';
import { convertPhraseToSnakeCase } from '@/utils';
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
        toast.error(error?.details);
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
        toast.error(error?.details);
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
        toast.warning(error?.details);
        return null;
    }

    const productMapped = mapProductList([product])[0];
    return productMapped || null;
}

export const SaveProduct = async (product: Product, images: File[]): Promise<Product | null> => {
    const urlImages = await uploadImagesStorage(images, product);
    if (urlImages.length === 0) {
        toast.error('No images uploaded');
        return null;
    }

    const { data, error, status } = await supabase
        .from('products')
        .insert([
            {
                name: product.name.trim(),
                description: product.description.trim(),
                price: product.price,
                discount: product.discount || null,
                colors: product.colors,
                sizes: product.sizes,
                category: product.category,
                source_image: urlImages,
                is_available: product.isAvailable,
                is_coming_soon: product.isComingSoon,
            }
        ])
        .single();
    
    if (error) {
        toast.error('Error inserting product', {
            description: error.message,
        });
        return null;
    }
    
    if (status !== 201) {
        toast.error('Error inserting product');
        return null;
    }

    toast.success('Product saved successfully');

    const productMapped = mapProductList([data])[0];
    return productMapped || null;
}

const uploadImagesStorage = async (images: File[], product: Product): Promise<string[]> => {
    if (!images) return [];

    const sourceImageFinal: string[] = [];

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const fullName = image.name;
        const extension = fullName.split('.').pop();
        const imageName = convertPhraseToSnakeCase(product.name) + '_' + new Date().getTime() + '.' + extension;

        const { data, error } = await supabase
            .storage
            .from(NAME_BUCKET_IMAGES)
            .upload(imageName, image, {
                cacheControl: '36000',
                upsert: false
            })

        // TODO: Remove console.log in production
        console.log('data', data);

        if (error) {
            toast.error('Error uploading image',{
                description: error.message,
            });
            return [];
        }

        const urlImage = SUPABASE_URL + STORAGE_OBJECT_PUBLIC_IMAGES + imageName;
        
        sourceImageFinal.push(urlImage);
    }

    return sourceImageFinal;
}