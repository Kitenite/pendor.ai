import { v4 as uuidv4 } from 'uuid';

export interface User {
    uuid: string;  
    username: string;
}

export interface Component {
    // Identifiers
    uuid: string;
    version: number;
    ownerIds: string[];  

    // Content
    type: string; 
    html: string;
    css: string;
    js: string;

    // Metadata
    tags: string[];  
    createdAt: string;
    prompt: string;  
}

export class ComponentImpl implements Component {
    // Identifiers
    uuid!: string;
    version = 0;
    ownerIds: string[] = [];

    // Content
    html = '';
    css = '';
    js = '';
    type = '';

    // Metadata
    tags: string[] = [];  
    createdAt: string;
    prompt = '';

    constructor(data: Partial<Component>) {
        // Using Object.assign to populate the properties
        Object.assign(this, data);
        this.createdAt = new Date().toISOString();
        if (!this.uuid) {
            this.uuid = uuidv4();
        }
    }
    
    get isPopulated(): boolean {
        return this.html !== '' || this.css !== '' || this.js !== '';
    }
}
