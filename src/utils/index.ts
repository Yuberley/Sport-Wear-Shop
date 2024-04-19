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

export const capitalizeFirstLetterName = (str: string) => {
    const strArray = str.split(' ')
    return strArray.map( (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

export const convertPhraseToSnakeCase = (frase: string): string => {
     // Eliminar caracteres no deseados (tildes y caracteres raros)
    const fraseSinTildes = frase.normalize("NFD") // Eliminar tildes
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\u2700-\u27BF]/g, '') // Eliminar emojis básicos
        .replace(/[\uD83C][\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ''); // Eliminar otros emojis
    
    // Convertir la frase a minúsculas y dividirla en palabras
    const palabras = fraseSinTildes.toLowerCase().split(/\s+/);

    // Concatenar las palabras con guiones bajos
    const fraseConvertida = palabras.join('_');
    
    return fraseConvertida;
}