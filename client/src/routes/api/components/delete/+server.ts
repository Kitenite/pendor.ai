import { ComponentServiceImpl } from '$lib/components/index.js';

export async function POST({ request }) {
    try {
        const componentService = new ComponentServiceImpl();
        const uuid =( await request.json()).uuid;
        const result = await componentService.deleteComponentByUuid(uuid);
        return new Response(JSON.stringify(result));
    } catch (err) {
        console.error(`Error deleting component: ${err}`);
        return new Response(`Error: ${err}`, { status: 500 });
    }
}
