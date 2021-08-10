import firebase from 'firebase-admin';
import serviceAccount from './service-account.json';

export const initializeFirebase = () => {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount as firebase.ServiceAccount)
    });
}
