import { supabase } from "../initSupabase";

const deleteImageStorage = async (url: string) => {
    const urlImage = url.split('/').pop() as string;

    const { data, error } = await supabase.storage.from('images').remove([urlImage])

    if (error) {
        console.error('Error deleting file: ', error.message);
        return;
    }

    // const newImagesSrc = product.imagesSrc.filter((imageSrc) => imageSrc !== url);
    // setProduct({
    //     ...product,
    //     imagesSrc: newImagesSrc,
    // });
}