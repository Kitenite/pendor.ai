import { ComponentServiceImpl } from '$lib/components/index.js';

export async function POST({ request }) {
    try {
        const componentService = new ComponentServiceImpl();
        const component = await request.json();
        const respUuid = await componentService.saveComponent(component);
        const respObj = { uuid: respUuid };
        return new Response( JSON.stringify(respObj));
    } catch (err) {
        console.error(`Error saving component: ${err}`);
        return new Response(`Error: ${err}`, { status: 500 });
    }
}
