export interface User {
    // Identifiers
    uuid: string;  
    username: string;

    // Ownership
    projects: string[];
    components: string[];
}
