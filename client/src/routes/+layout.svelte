<script>
	import '../app.css';

	// Import the functions you need from the SDKs you need
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';
	import { getFirestore } from 'firebase/firestore';
	import { getStorage } from 'firebase/storage';

	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
	const auth = getAuth(app);
	const db = getFirestore(app);
	const storage = getStorage(app);
</script>

<slot />
