import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function MyFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyD6CAzw5IKc5yfec2oPrvS5tNn0lkUkC3E',
    authDomain: 'cartology-pdp.firebaseapp.com',
    projectId: 'cartology-pdp',
    storageBucket: 'cartology-pdp.appspot.com',
    messagingSenderId: '113103912261',
    appId: '1:113103912261:web:9ab87d23a4219f5367522c'
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  const self = {};

  self.getProducts = async () => {
    const products = [];
    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach(doc => {
      products.push(doc.data());
    });
    return products;
  };

  return { firebaseApp };
}

export const myFirebase = new MyFirebase();
