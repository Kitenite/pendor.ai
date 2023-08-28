import type { Component } from '$lib/models/User';
import {it, expect} from 'vitest';
import { ComponentServiceImpl } from './service';
import { initializeApp } from 'firebase/app';
    
it('saveComponent', async () => {
    return true; // Don't run this test for now. It adds actual data to the database.
    const firebaseConfig = {
		apiKey: 'AIzaSyCyBXYqVC_MslL5O3Dkq5TY__UUwiyKXYI',
		authDomain: 'llm-designer.firebaseapp.com',
		projectId: 'llm-designer',
		storageBucket: 'llm-designer.appspot.com',
		messagingSenderId: '655347287447',
		appId: '1:655347287447:web:b55b60bf3b21e01e1770d2',
		measurementId: 'G-V1FMQF639Q'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
    
    const component: Component = {
        uuid: '',
        html: '<div id="test"></div>',
        css: '',
        js: ''
    }

    const componentService = new ComponentServiceImpl();
    const resp = await componentService.saveComponent(component);
    expect((resp == 'components/comp-test.json'))

})
