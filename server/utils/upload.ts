import { createWriteStream } from 'fs';
import { FileUpload } from '../context';
import { paths } from './paths';

export const uploadFile = async (file: FileUpload): Promise<string | null> => {
        const filePath = await paths(file);
        const { createReadStream } = await file
        return new Promise(async (reslve, reject) => createReadStream()
                .pipe(createWriteStream(filePath as string))
                .on('finish', () => reslve(filePath))
                .on('error', (ex: any) => reject(ex)));
}