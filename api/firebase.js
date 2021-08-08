const firebase = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const initializeFirebase = () => {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    });
}

module.exports = initializeFirebase;