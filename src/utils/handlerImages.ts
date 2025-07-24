import { MAX_SIZE_IMAGE_IN_MB, UNIT_SIZE_IN_BYTES } from '@/constants';

export const HandlerImagesInLocal = async (event: React.ChangeEvent<HTMLInputElement>): Promise<File[]> => {
    if (!event.target.files) return [];

    const maxSizeInBytes = MAX_SIZE_IMAGE_IN_MB * UNIT_SIZE_IN_BYTES;
    const files = Array.from(event.target.files);
    const validFiles: File[] = [];

    for (const file of files) {
        if (!file) {
            console.error('No file selected or file is invalid.');
            continue;
        }

        if (file.size > maxSizeInBytes) {
            console.error(`File ${file.name} exceeds the maximum size of ${MAX_SIZE_IMAGE_IN_MB} MB.`);
            continue;
        }

        if (!file.type.startsWith('image/')) {
            console.error(`File ${file.name} is not a valid image type.`);
            continue;
        }

        validFiles.push(file);
    }

    return validFiles;
}

export const RemoveImageFromLocal = (index: number, localImages: File[], setLocalImages: (images: File[]) => void) => {
    const newImages = [...localImages];
    newImages.splice(index, 1);
    setLocalImages(newImages);
};