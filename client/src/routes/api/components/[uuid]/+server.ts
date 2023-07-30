import fs from 'fs/promises';
import type { Component } from '$lib/models';

const getComponentByUuid = async (uuid: string) => {
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


export async function GET({ params: {uuid} }) {
    
    const component: Component = await getComponentByUuid(uuid);
    return new Response(JSON.stringify(component));
}
