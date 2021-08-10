import firebase from 'firebase-admin';

import { Collections } from '../common/enum/collections';

export default class UserRepository {
    static async create(newUser) {
        const { 
            authID,
            firstName,
            lastName,
            email,
        } = newUser;

        const { id } = await firebase
            .firestore()
            .collection(Collections.USERS)
            .add({
                authIDs: [authID],
                firstName,
                lastName,
                email,
            });

        const userDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(id)
            .get();

        const user = {
            id,
            ...userDoc.data(),
        }

        return user;
    }

    static async getAll() {
        const usersQuerySnapshot: FirebaseFirestore.QuerySnapshot = await firebase
            .firestore()
            .collection(Collections.USERS)
            .get();
        const users = [];

        usersQuerySnapshot.forEach((userDoc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const user = {
                id: userDoc.id,
                ...userDoc.data(),
            };

            users.push(user);
        });

        return users;
    }

    static async getById(id: string) {
        const userDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.USERS)
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

    static async getByUid(uid: string) {
        const usersQuerySnapshot: FirebaseFirestore.QuerySnapshot = await firebase
            .firestore()
            .collection(Collections.USERS)
            .where('authIDs', 'array-contains', uid)
            .get();

        if(!usersQuerySnapshot.empty) {
            const userQueryDocumentSnapshot: FirebaseFirestore.QueryDocumentSnapshot = usersQuerySnapshot.docs[0];
            const userDoc = userQueryDocumentSnapshot.data();
            const user = {
                id: userQueryDocumentSnapshot.id,
                ...userDoc,
            }

            return user;
        }

        return null;
    }

    static async update(id: string, updatedUser) {
        const userRef: FirebaseFirestore.DocumentReference = firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(id);
        await userRef.update(updatedUser);

        const userDoc: FirebaseFirestore.DocumentSnapshot = await userRef.get();

        const user = {
            id: userDoc.id,
            ...userDoc.data(),
        };

        return user;
    }

    static async delete(id: string) {
        const userRef: FirebaseFirestore.DocumentReference = firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(id);

        await userRef.delete();
    }
}
