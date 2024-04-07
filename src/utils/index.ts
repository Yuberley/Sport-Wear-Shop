export const replaceSpacesWithDashes = (frase: string) => {
    frase = frase.trim().toLowerCase();
    return frase.replace(/\s+/g, '-');
}

export const capitalizeFirstLetter = (str: string) => {
    const strArray = str.split('-')
    return strArray.map( (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}