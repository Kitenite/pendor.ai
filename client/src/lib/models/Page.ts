import { v4 as uuidv4 } from 'uuid';

export interface Page {
    // Identifiers
    uuid: string;
    version: number;

    // Content
    js: string;
    html: string;
    css: string;
    componentUuuids: string[];

    // Metadata
    title: string;
    description: string;
    tags: string[];
    createdAt: string;
}

export class PageImpl implements Page {
    uuid: string;
    version: number;

    // Content
    js: string;
    html: string;
    css: string;
    componentUuuids: string[];

    // Metadata
    title: string;
    description: string;
    tags: string[];
    createdAt: string;

    constructor(title = '', version = 0, description = '', js = '', html = '', css = '', componentUuuids: string[] = [], tags: string[] = []) {
        this.uuid = uuidv4();
        this.version = version;
        this.title = title;
        this.description = description;
        this.js = js;
        this.html = html;
        this.css = css;
        this.componentUuuids = componentUuuids || [];
        this.tags = tags || [];
        this.createdAt = new Date().toISOString();
    }

    // Method to add a new component UUID to the page
    addComponentUUID(uuid: string): void {
        if(!this.componentUuuids.includes(uuid)) {
            this.componentUuuids.push(uuid);
        }
    }

    // For testing from JSON
    static fromJSON(json: string): PageImpl {
        const data = JSON.parse(json);
        const page = new PageImpl(data.title, data.version, data.description, data.js, data.html, data.css, data.componentUuuids, data.tags);
        page.uuid = data.uuid;
        page.createdAt = data.createdAt;
        return page;
    }
}
