import { google } from 'googleapis';
import { Product } from '@/app/interfaces/products';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export const getProducts = async (): Promise<Product[]> => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });
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

        console.log('products index', products);

        return products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};