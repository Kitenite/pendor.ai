import { v4 as uuidv4 } from 'uuid';

export interface Component {
    // Identifiers
    uuid: string;
    version: number;

    // Content
    type: string; 
    html: string;
    css: string;
    js: string;

    // Metadata
    description: string;  
    tags: string[];  
    createdAt: string;
}

export class ComponentImpl implements Component {
    // Identifiers
    uuid!: string;
    version = 0;

    // Content
    html = '';
    css = '';
    js = '';
    type = '';

    // Metadata
    tags: string[] = [];  
    createdAt: string;
    description = '';

    constructor(data: Partial<Component>) {
        // Using Object.assign to populate the properties
        Object.assign(this, data);
        this.createdAt = data.createdAt || new Date().toISOString();
        if (!this.uuid) {
            this.uuid = uuidv4();
        }
    }
    
    get isPopulated(): boolean {
        return this.html !== '' || this.css !== '' || this.js !== '';
    }

    // Method to handle deserialization from JSON
    static fromJSON(json: string): ComponentImpl {
        const data = JSON.parse(json);
        return new ComponentImpl(data);
    }
}
