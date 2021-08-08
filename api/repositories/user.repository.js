const firebase = require('firebase-admin');
const collections = require('../collections');
class UserRepository {
    static async create(newUser) {
        const { 
            authID,
            firstName,
            lastName,
            email,
        } = newUser;

        const { id } = await firebase
            .firestore()
            .collection(collections.USERS)
            .add({
                authIDs: [authID],
                firstName,
                lastName,
                email,
            });

        const userDoc = await firebase
            .firestore()
            .collection(collections.USERS)
            .doc(id)
            .get();

        const user = {
            id,
            ...userDoc.data(),
        }

        return user;
    }

    static async getAll() {
        const usersQuerySnapshot = await firebase
            .firestore()
            .collection(collections.USERS)
            .get();
        const users = [];

        usersQuerySnapshot.forEach(userDoc => {
            const user = {
                id: userDoc.id,
                ...userDoc.data(),
            };

            users.push(user);
        });

        return users;
    }

    static async getById(id) {
        const userDoc = await firebase
            .firestore()
            .collection(collections.USERS)
            .doc(id)
            .get();

        if(userDoc.exists) {
            const user = {
                id: userDoc.id,
                ...userDoc.data(),
            };
    
            return user;
        }

        return null;
    }

    static async getByUid(uid) {
        const usersQuerySnapshot = await firebase
            .firestore()
            .collection(collections.USERS)
            .where('authIDs', 'array-contains', uid)
            .get();

        if(!usersQuerySnapshot.empty) {
            const userDocumentSnapshot = usersQuerySnapshot.docs[0];
            const userDoc = userDocumentSnapshot.data();
            const user = {
                id: userDocumentSnapshot.id,
                ...userDoc,
            }

            return user;
        }

        return null;
    }

    static async update(id, updatedUser) {
        const userRef = firebase
            .firestore()
            .collection(collections.USERS)
            .doc(id);
        await userRef.update(updatedUser);

        const userDoc = await userRef.get();

        const user = {
            id: userDoc.id,
            ...userDoc.data(),
        };

        return user;
    }

    static async delete(id) {
        const userRef = firebase
            .firestore()
            .collection(collections.USERS)
            .doc(id);

        await userRef.delete();
    }
}

module.exports = UserRepository;