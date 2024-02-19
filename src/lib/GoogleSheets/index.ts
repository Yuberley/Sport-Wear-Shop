import { google } from 'googleapis';
import { Product } from '@/app/interfaces/products';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Products!A2:K',
        });

        const rows = response.data.values || [];

        const products: Product[] = rows.map((row) => ({
            id: row[0] ? row[0] : '',
            name: row[1] ? row[1] : '',
            description: row[2] ? row[2] : '',
            price: row[3] ? row[3] : '',
            discount: row[4] ? row[4] : 0,
            newPrice: row[5] ? row[5] : '',
            colors: row[6] ? row[6].split(',').map((color: string) => color.trim()) : [],
            sizes: row[7] ? row[7].split(',').map((size: string) => size.trim()) : [],
            category: row[8] ? row[8] : '',
            imagesSrc: row[9] ? row[9].split(',') : [],
            isAvailable: row[10] ? row[10].toString().trim().toLowerCase() === 'si' : false,
        }));

        return products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};


let cachedProducts: Product[] | null = null;
let lastFetchTime: number = 0;

export const getProductsCached = async (category?: string): Promise<Product[]> => {
    try {
        // Verificar si los productos están en caché y si ha pasado menos de 1 minuto desde la última solicitud
        const timeCache = 1000 * 60; // 1 minuto

        const currentTime = Date.now();
        if (cachedProducts && currentTime - lastFetchTime < timeCache) {
            console.log('Obteniendo productos de la caché');
            if (category) {
                return cachedProducts.filter(
                    (product) => product.category.toLowerCase() === category.replace(/-/g, ' ').toLowerCase()
                );
            };
            return cachedProducts;
        }

        console.log('Obteniendo productos de Google Sheets');

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Products!A2:K',
        });

        const rows = response.data.values || [];

        const products: Product[] = rows.map((row) => ({
            id: row[0] ? row[0] : '',
            name: row[1] ? row[1] : '',
            description: row[2] ? row[2] : '',
            price: row[3] ? row[3].trim() : '',
            discount: row[4] ? row[4] : '',
            newPrice: row[5] ? row[5].trim() : '',
            colors: row[6] ? row[6].split(',').map((color: string) => color.trim()) : [],
            sizes: row[7] ? row[7].split(',').map((size: string) => size.trim()) : [],
            category: row[8] ? row[8] : '',
            imagesSrc: row[9] ? row[9].split(',') : [],
            isAvailable: row[10] ? row[10].toString().trim().toLowerCase() === 'si' : false,
        }));

        // Actualizar la caché de productos y el tiempo de la última solicitud
        cachedProducts = products;
        lastFetchTime = currentTime;

        if (category) {
            return products.filter(
                (product) => product.category.toLowerCase() === category.toLowerCase()
            );
        };

        return products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};


export const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
        const products: Product[] = await getProductsCached();
        const product = products.find((product) => product.id === id);

        return product;
    } catch (error) {
        console.error('Error al obtener el producto por id:', error);
        return undefined;
    }
};