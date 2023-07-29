import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const saveComponent = async (dataString: JSON, uuid: string | undefined) => {
    uuid = (uuid === undefined || uuid === '') ? uuidv4() : uuid;
    const fileName = `comp-${uuid}`
    const location = `storage/${fileName}.json`;
    try {
        await fs.writeFile(location, JSON.stringify(dataString));
        console.log('Data written to file');
    } catch (err) {
        console.error(`Error writing to file: ${err}`);
        throw err;
    }
    return uuid;
}

export async function POST({ request }) {
    const { data, uuid } = await request.json()
    try {
        const respUuid = await saveComponent(data, uuid);
        const respObj = { uuid: respUuid };
        return new Response( JSON.stringify(respObj));
    } catch (err) {
        return new Response(`Error: ${err}`, { status: 500 });
    }
}
