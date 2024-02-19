import { google } from 'googleapis';
import { Colors } from '../../app/interfaces/products';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

const getDataTypes = async (sheet: string, range: string): Promise<any[]> => {
    try { 
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
    const categoriesRows = await getDataTypes('Types', 'A2:A');
    const categories: string[] = categoriesRows.map((row) => row[0]);
    return categories;
};


export const getColors = async (): Promise<Colors[]> => {
    const colorsRow = await getDataTypes('Types', 'C2:D');
    const colors: Colors[] = colorsRow.map((row) => ({ color: row[0], value: row[1] }));
    return colors;
};

export const getSizes = async (): Promise<string[]> => {
    const sizesRows = await getDataTypes('Types', 'F2:F');
    const sizes: string[] = sizesRows.map((row) => row[0]);
    return sizes;
};