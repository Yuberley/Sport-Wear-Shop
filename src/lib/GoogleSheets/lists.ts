import {
    sheets as sheetsGoogle,
    auth as authGoogle,
} from '@googleapis/sheets';
import { Colors } from '../../app/interfaces/products';
import serviceAccount from '../../../service-account.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

let cachedCategories: string[] | null = null;
let cachedColors: Colors[] | null = null;
let cachedSizes: string[] | null = null;
let lastTimeCached: number = 0;
const timeToCache = 1000 * 60 * 5; // 5 minutos

const getDataTypes = async (sheet: string, range: string): Promise<any[]> => {
    try {        
        const auth = await authGoogle.getClient({
            credentials: serviceAccount,
            scopes: SCOPES
        });
        
        const sheets = sheetsGoogle({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheet}!${range}`,
        });

        const rows = response.data.values || [];

        return rows;

    } catch (error) {
        console.error('Error al obtener los tipos de datos:', error);
        return [];
    }
};


export const getCategories = async (): Promise<string[]> => {

    if (cachedCategories) {
        console.log('Obteniendo categorías de la caché');
        return cachedCategories;
    }

    console.log('Obteniendo categorías de Google Sheets');

    const categoriesRows = await getDataTypes('Types', 'A2:A');
    const categories: string[] = categoriesRows.map((row) => row[0]);
    cachedCategories = categories;
    return categories;
};


export const getColors = async (): Promise<Colors[]> => {

    if (cachedColors && Date.now() - lastTimeCached < timeToCache) {
        console.log('Obteniendo colores de la caché');
        return cachedColors;
    }

    console.log('Obteniendo colores de Google Sheets');
    
    const colorsRow = await getDataTypes('Types', 'C2:D');
    const colors: Colors[] = colorsRow.map((row) => ({ color: row[0], value: row[1] }));
    cachedColors = colors;
    lastTimeCached = Date.now();
    return colors;
};

export const getSizes = async (): Promise<string[]> => {

    if (cachedSizes && Date.now() - lastTimeCached < timeToCache) {
        console.log('Obteniendo tallas de la caché');
        return cachedSizes;
    }
    
    console.log('Obteniendo tallas de Google Sheets');
    
    const sizesRows = await getDataTypes('Types', 'F2:F');
    const sizes: string[] = sizesRows.map((row) => row[0]);
    cachedSizes = sizes;
    lastTimeCached = Date.now();
    return sizes;
};