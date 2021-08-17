interface ITour {
    id: string;
    adultPrice?: number;
    duration?: number;
    fromCity?: FirebaseFirestore.DocumentReference;
    hotel?: FirebaseFirestore.DocumentReference;
    kidPrice?: number;
    toCity?: FirebaseFirestore.DocumentReference;
}
