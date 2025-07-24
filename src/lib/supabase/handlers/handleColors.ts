import { Color } from '@/interfaces';
import { supabase } from '@/lib/supabase/initSupabase';
import { mapColorList } from '@/utils/mappers';
import { toast } from 'sonner';

export const GetColors = async (): Promise<Color[]> => {
    let { data: colors, error } = await supabase
        .from('types_colors')
        .select('*');

    if (error) {
        toast.error(error?.details);
        return [];
    }

    const mappedColors = mapColorList(colors);
    return mappedColors || [];
}