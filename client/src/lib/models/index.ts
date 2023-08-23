export interface User {
    uuid: string;  // TODO implement
    username: string;
}

export interface Component {
    // Identifiers
    uuid: string;
    version: number;
    ownerIds: string[];  // TODO implement

    // Content
    type: string; // TODO implement
    html: string;
    css: string;
    js: string;

    // Metadata
    tags: string[];  // TODO implement
    createdAt: string;
    prompt: string;  // TODO implement
}