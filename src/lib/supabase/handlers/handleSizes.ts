import { Size } from '@/interfaces';
import { supabase } from '@/lib/supabase/initSupabase';
import { mapSizeList } from '@/utils/mappers';
import { toast } from 'sonner';

export const GetSizes = async (): Promise<Size[]> => {
    let { data: sizes, error } = await supabase
        .from('types_sizes')
        .select('*');

    if (error) {
        toast.error(error?.details);
        return [];
    }

    const mappedSizes = mapSizeList(sizes);
    return mappedSizes || [];
}