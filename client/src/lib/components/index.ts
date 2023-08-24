import { FirebaseService } from '$lib/firebase';
import type { Component } from '$lib/models/index.js';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export interface ComponentService {
    saveComponent(component: Component): Promise<string>;
    listComponentUuis(): Promise<string[]>;
    getComponentByUuid(uuid: string): Promise<Component>;
    deleteComponentByUuid(uuid: string): Promise<string>;
}


export class ComponentServiceImpl implements ComponentService {
    constructor() {
        const firebaseService = new FirebaseService();
    }

    buildPathReference = (uuid: string): string => {
        return `components/${uuid}.json`;
    }

    createBuffer = (component: Component): Buffer => {
        const str = JSON.stringify(component);
        const buffer = Buffer.from(str, 'utf8');
        return buffer;
    }

    getUuidFromFileName = (fileName: string): string => {
        return fileName.replace('.json', "").replace('components/', "");
    }

    async saveComponent(component: Component): Promise<string> {
        const uuid: string = (component.uuid && component.uuid != "") ? component.uuid : uuidv4();
        component.uuid = uuid;
        
        const buffer = this.createBuffer(component);
        const pathReference = this.buildPathReference(uuid);

        // This should be injected for testing
        const storage = getStorage();
        const storageRef = ref(storage, pathReference);
        const uploadTask = uploadBytes(storageRef, buffer);
        return pathReference;
    }

    async listComponentUuis(): Promise<string[]> {
        const storage = getStorage();
        const componentsFolderRef = ref(storage, 'components/');
        const result = await listAll(componentsFolderRef);

        const uuids: string[] = result.items.map(itemRef => {
            return this.getUuidFromFileName(itemRef.name);
        });

        return uuids;
    }

    async getComponentByUuid(uuid: string): Promise<Component> {
        const pathReference = this.buildPathReference(uuid);
        const storage = getStorage();
        const storageRef = ref(storage, pathReference);
        const downloadURL = await getDownloadURL(storageRef);
        
        const response = await fetch(downloadURL);
        const component: Component = await response.json();
        return component;
    }

    async deleteComponentByUuid(uuid: string): Promise<string> {
        const pathReference = this.buildPathReference(uuid);
        const storage = getStorage();
        const storageRef = ref(storage, pathReference);
        return deleteObject(storageRef).then(() => {
            console.log("File deleted successfully");
            return "File deleted successfully"
          }).catch((error) => {
            console.log("Error deleting file: ", error);
            return "Error deleting file: " + error
          });    
        }
}
