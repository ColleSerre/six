import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
}

const useAuthState = (): AuthState => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      user?.reload();
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
};

export default useAuthState;
