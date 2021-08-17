interface IHotel {
    id: string;
    city?: FirebaseFirestore.DocumentReference;
    description?: string;
    maxAdultsCount?: number;
    maxKidsCount?: number;
    name?: string;
}
