export const replaceSpacesWithDashes = (frase: string) => {
    frase = frase.trim()
    return frase.replace(/\s+/g, '-');
}