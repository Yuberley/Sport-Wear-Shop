import {
    sheets as sheetsGoogle,
    auth as authGoogle,
} from '@googleapis/sheets';
import { Product } from '@/app/interfaces/products';
import serviceAccount from '../../../service-account.json';
// import { products } from '@/app/data';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];


let cachedProducts: Product[] | null = null;
let lastTimeCached: number = 0;
const timeToCache = 1000 * 60 * 5; // 5 minutos

export const getProductsCached = async (category?: string): Promise<Product[]> => {

    try {

        if (cachedProducts?.length && Date.now() - lastTimeCached < timeToCache) {
            if (category) {

                console.log('category cache', category);

                return cachedProducts.filter(
                    (product) => product.category.toLowerCase() === category.replace(/-/g, ' ').toLowerCase()
                );
            };

            console.log('products cache', cachedProducts);
            return cachedProducts;
        }

        
        const auth = await authGoogle.getClient({
            credentials: serviceAccount,
            scopes: SCOPES
        });
        
        const sheets = sheetsGoogle({ version: 'v4', auth });

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

        cachedProducts = products;
        lastTimeCached = Date.now();
        
        if (category) {
            console.log('category normal', category);
            return products.filter(
                (product) => product.category.toLowerCase() === category.toLowerCase()
            );
        };

        console.log('products normal', products);
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