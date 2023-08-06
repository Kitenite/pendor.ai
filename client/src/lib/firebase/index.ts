import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export class FirebaseService {
    static instance;
    auth;
    db;
    storage;

    constructor() {
        if (FirebaseService.instance) {
            return FirebaseService.instance;
        }

        this.init();
        FirebaseService.instance = this;
    }

    init() {
        const firebaseConfig = {
            apiKey: 'AIzaSyCyBXYqVC_MslL5O3Dkq5TY__UUwiyKXYI',
            authDomain: 'llm-designer.firebaseapp.com',
            projectId: 'llm-designer',
            storageBucket: 'llm-designer.appspot.com',
            messagingSenderId: '655347287447',
            appId: '1:655347287447:web:b55b60bf3b21e01e1770d2',
            measurementId: 'G-V1FMQF639Q'
        };

        let app;
        try {
            app = getApp();
        } catch (error) {
            app = initializeApp(firebaseConfig);
        }

        this.auth = getAuth(app);
        this.db = getFirestore(app);
        this.storage = getStorage(app);
    }

}
