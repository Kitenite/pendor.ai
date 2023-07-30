import type { Component } from '$lib/models/index.js';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const saveComponent = async (component: Component) => {
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

export async function POST({ request }) {
    try {
        const component = await request.json();
        const respUuid = await saveComponent(component);
        const respObj = { uuid: respUuid };
        return new Response( JSON.stringify(respObj));
    } catch (err) {
        console.error(`Error saving component: ${err}`);
        return new Response(`Error: ${err}`, { status: 500 });
    }
}
