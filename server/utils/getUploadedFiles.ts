import { FileUpload } from '../context';
import { uploadFile } from './upload';

export const uploadedFiles = async (files: FileUpload[]) =>  {
    const paths = []
    for (let instance of files) {
        const file = await instance;
        const path = await uploadFile(file);
        path && paths.push(path)
    }
    return paths
    }