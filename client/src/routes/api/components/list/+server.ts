import { ComponentServiceImpl } from "$lib/components";

export async function GET() {
    const componentService = new ComponentServiceImpl();
    const uuids: string[] = await componentService.listComponentUuis();
    return new Response(uuids.toString());
}