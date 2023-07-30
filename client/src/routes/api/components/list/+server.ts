import fs from 'fs/promises';

const getUuids = async () => {
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

export async function GET() {
    const uuids: string[] = await getUuids();
    return new Response(uuids.toString());
}