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
            range: 'Products!A2:G19',
        });

        const rows = response.data.values || [];
        const products: Product[] = rows.map((row) => ({
            id: row[0] ? row[0] : '',
            name: row[1] ? row[1] : '',
            description: row[2] ? row[2] : '',
            price: row[3] ? row[3] : '',
            colors: row[4] ? row[4].split(',').map((color: string) => color.trim()) : [],
            sizes: row[5] ? row[5].split(',').map((size: string) => size.trim()) : [],
            imagesSrc: row[6] ? row[6].split(',') : [],
        }));

        return products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}
