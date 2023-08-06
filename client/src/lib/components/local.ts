import type { Component } from '$lib/models/index.js';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import type { ComponentService } from '.';

class LocalComponentService implements ComponentService {
    async saveComponent(component: Component): Promise<string> {
        const uuid: string = component.uuid || uuidv4();
        const fileName = `comp-${uuid}`
        const location = `storage/${fileName}.json`;
        component.uuid = uuid;
    
        try {
            await fs.writeFile(location, JSON.stringify(component));
            console.log('Data written to file');
        } catch (err) {
            console.error(`Error writing to file: ${err}`);
            throw err;
        }
        return uuid;
    }

    async listComponentUuis(): Promise<string[]> {
        const directoryPath = 'storage';
        try {
            const files = await fs.readdir(directoryPath);
            const uuids = files.map(file => {
                const matches = file.match(/comp-(.+)\.json/);
                return matches ? matches[1] : null;
            }).filter(uuid => uuid !== null) as string[];
            return uuids;
        } catch (err) {
            console.error(`Error getting the files from ${directoryPath}: ${err}`);
            return [];
        }
    }

    async getComponentByUuid(uuid: string): Promise<Component> {
        const fileName = `comp-${uuid}.json`;
        const filePath = `storage/${fileName}`;
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error(`Error reading file ${filePath}: ${err}`);
            throw err;
        }
    }
}
