import { Category } from '@/interfaces';
import { supabase } from '@/lib/supabase/initSupabase';
import { mapCategoryList } from '@/utils/mappers';
import { toast } from 'sonner';

export const GetCategories = async (): Promise<Category[]> => {
    let { data: categories, error } = await supabase
        .from('types_categories')
        .select('*');

    if (error) {
        toast.error(error?.details);
        return [];
    }

    const mappedCategories = mapCategoryList(categories);
    return mappedCategories || [];
}