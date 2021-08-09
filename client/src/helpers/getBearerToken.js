import firebase from 'firebase';

export const getBearerToken = async () => {
    const token = await firebase
        .auth()
        .currentUser
        .getIdToken();
    const bearerToken = `Bearer ${token}`;

    return bearerToken;
};
