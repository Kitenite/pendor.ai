import { ComponentServiceImpl } from '$lib/components/service.js';
import type { Component } from '$lib/models/User.js';

export async function GET({ params: {uuid} }) {
    const componentService = new ComponentServiceImpl();
    const component: Component = await componentService.getComponentByUuid(uuid);
    return new Response(JSON.stringify(component));
}
