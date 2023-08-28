import { ComponentImpl } from "./Component";
import { PageImpl } from "./Page";
import { v4 as uuidv4 } from 'uuid';

// TODO: Currently storing all project data in an object but later will need to break pages and components out into their own tables
interface Project {
    // Identifiers
    uuid: string;
    version: number;

    // Content
    pages: PageImpl[];
    components: ComponentImpl[];
    activeComponentUuid?: string;

    // Metadata
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    
}

export class ProjectImpl implements Project {
    uuid: string = uuidv4();
    version = 0;
    title = '';
    description = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    activeComponentUuid?: string;
    pages: PageImpl[] = [];
    components: ComponentImpl[] = [];

    constructor(data: Partial<Project> = {}) {
        // Using Object.assign to populate the properties
        Object.assign(this, data);

        if (!data.createdAt) {
            this.createdAt = new Date();
        }
        if (!data.updatedAt) {
            this.updatedAt = new Date();
        }
        if (!data.uuid) {
            this.uuid = uuidv4();
        }
    }
    // Method to get Page by UUID
    getPageByUUID(uuid: string): PageImpl | undefined {
        return this.pages.find(page => page.uuid === uuid);
    }

    // Method to get Component by UUID
    getComponentByUUID(uuid: string): ComponentImpl | undefined {
        return this.components.find(component => component.uuid === uuid);
    }

    // Method to update Component
    updateComponent(component: ComponentImpl): void {
        const componentIndex = this.components.findIndex(comp => comp.uuid === component.uuid);
        if (componentIndex !== -1) {
            this.components[componentIndex] = component;
            this.updatedAt = new Date();
        }
    }

    static fromJSON(json: string): ProjectImpl {
        const data = JSON.parse(json);
    
        // Deserializing the pages and components if they have fromJSON methods
        const pages: PageImpl[] = data.pages.map((pageData: any) => PageImpl.fromJSON(JSON.stringify(pageData)));
        const components: ComponentImpl[] = data.components.map((componentData: any) => ComponentImpl.fromJSON(JSON.stringify(componentData)));
    
        // Creating the ProjectImpl instance using the updated constructor
        const project = new ProjectImpl({
            uuid: data.uuid,
            version: data.version,
            title: data.title,
            description: data.description,
            pages: pages,
            components: components,
            activeComponentUuid: data.activeComponentUuid,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt)
        });
    
        return project;
    }
}