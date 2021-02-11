import { readFile, writeFile } from 'fs';

export const FileHelper = {
  write: async (filename: string, content: any) => {
    return await new Promise((resolve) =>
      writeFile(filename, content, () => resolve(true))
    );
  },

  read: async (filename: string) => {
    return await new Promise<string>((resolve, reject) =>
      readFile(filename, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      })
    );
  },
};
