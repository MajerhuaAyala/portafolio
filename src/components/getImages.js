import fs from 'fs';
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fsPromise = fs.promises

export default class Utils {
    async readFiles(dirname="sev", baseUrl='/portafolio') {
        const folderPath = path.resolve(__dirname, `../../public/projects/${dirname}`) ;
        try {
            return (await fsPromise.readdir(folderPath)).map(image => `${baseUrl}/projects/${dirname}/${image}`)
        } catch (error){
            console.error(`Error en leer los archivos: `, error)
        }
    }
}