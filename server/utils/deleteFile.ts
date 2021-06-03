import { unlink } from 'fs';
export const deleteFile = (filePath: string) =>
  unlink(filePath, (ex) => {
    if (ex) throw ex;
  });
