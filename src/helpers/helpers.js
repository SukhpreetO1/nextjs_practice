import { getAuth, onAuthStateChanged, jwt, collection, getDocs, query, where, db } from '@/app/api/routes/page';

export async function fetchUserDataFromToken(setUserData) {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const token = await user.getIdToken();
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                const email = decodedToken.email;
                const usersCollection = collection(db, 'users');
                const querySnapshot = await getDocs(query(usersCollection, where('email', '==', email)));

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setUserData(doc.data());
                    });
                } else {
                    setUserData(email);
                    console.log('User document not found');
                }
            } else {
                console.log('Unable to decode token');
            }
        } else {
            console.log('User is not authenticated');
        }
    });
    return unsubscribe; // Return the cleanup function
}