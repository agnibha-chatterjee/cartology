import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  startAfter,
  limit,
  orderBy,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

const PRODUCT_COLLECTION = 'products';

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
    const querySnapshot = await getDocs(collection(db, PRODUCT_COLLECTION));
    querySnapshot.forEach(doc => {
      products.push(doc.data());
    });
    return products;
  };

  self.getProductsWithinLimits = async (lastVisible, itemsPerPage) => {
    const q = query(
      collection(db, PRODUCT_COLLECTION),
      orderBy('createdAt'),
      startAfter(lastVisible || 0),
      limit(itemsPerPage)
    );
    const querySnapshot = await getDocs(q);
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const newProducts = querySnapshot.docs.reverse().map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { newProducts, lastVisibleDoc };
  };

  self.addProduct = async product => {
    await addDoc(collection(db, PRODUCT_COLLECTION), product);
    return product;
  };

  self.deleteProduct = async id => {
    await deleteDoc(doc(db, PRODUCT_COLLECTION, id));
  };

  self.updateProduct = async (id, updatedProductDetails) => {
    await updateDoc(doc(db, PRODUCT_COLLECTION, id), updatedProductDetails);
    return updatedProductDetails;
  };

  self.getTotalCountOfProducts = async () => {
    const querySnapshot = await getDocs(collection(db, PRODUCT_COLLECTION));
    return querySnapshot.size;
  };

  return self;
}

export const myFirebase = new MyFirebase();
