import firebase from 'firebase-admin';

import { Collections } from '../common/enum/collections';

export default class ReviewRepository {
    async createWithBatch(newReview, batch: FirebaseFirestore.WriteBatch) {
        const { content, rating } = newReview;
    
        const currentDate = firebase.firestore.Timestamp.now()

        const reviewRef = await firebase
            .firestore()
            .collection(Collections.REVIEWS)
            .doc();

        const userRef = firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(newReview.userId);

        const hotelRef = firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(newReview.hotelId);

        batch.set(reviewRef, {
            content,
            rating,
            userRef,
            hotelRef,
            createdAt: currentDate,
            updatedAt: currentDate,
        });

        const reviewId = reviewRef.id;

        return reviewId;
    }

    async getById(id: string) {
        const reviewDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.REVIEWS)
            .doc(id)
            .get();

        const {
            content,
            rating,
            hotelRef,
            userRef,
            createdAt,
            updatedAt,
        } = reviewDoc.data();

        const review = {
            id,
            content,
            rating,
            userId: userRef.id,
            hotelId: hotelRef.id,
            createdAt,
            updatedAt,
        };

        return review;
    }

    async delete(id: string) {
        const reviewRef: FirebaseFirestore.DocumentReference = firebase
            .firestore()
            .collection(Collections.REVIEWS)
            .doc(id);

        await reviewRef.delete();
    }
}
