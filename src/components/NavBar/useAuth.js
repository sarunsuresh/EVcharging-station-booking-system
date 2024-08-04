import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      console.log('Auth state changed:', authUser);  // Log the authUser
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
