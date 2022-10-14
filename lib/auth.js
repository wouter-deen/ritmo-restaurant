import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  confirmPasswordReset as confirmReset,
  createUserWithEmailAndPassword,
  getAuth,
  onIdTokenChanged,
  sendPasswordResetEmail as sendResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import nookies from "nookies";

import firebaseApp from "@/lib/firebase";
import {useRouter} from "next/router";
import {useToast} from "@chakra-ui/react";

const auth = getAuth(firebaseApp);
const authContext = createContext();

export function AuthProvider({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const toast = useToast();

  //makes sure everything is up-to-date in the db, fires after register and login
  const handleUser = async (rawUser, firstName, lastName) => {
    if(rawUser) {
      const user = formatUser(rawUser, firstName, lastName);

      if(firstName) {
        await updateProfile(auth.currentUser, {
          displayName: firstName
        });
      }

      fetch(`api/user/createAndUpdateUser/${user.uid}/${JSON.stringify(user)}`)
        .then(response => response.json())
        .then((data) => {return data})
        .catch((e) => console.log(e));
      setUser(user)
    } else {
      setUser(false)
      return false
    }
  }

  async function signin(email, password) {

    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        handleUser(userCredential.user);
        return userCredential.user;
      }).catch(e => {throw e});
  }

  const signup = async (email, password, firstName, lastName) => {

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => await handleUser(userCredential.user, firstName, lastName))
      .then(() => {return "success"})
      .catch((e) => {throw e});
  };

  const signout = () => {
    router.push("/");
    toast({
      title: "Je bent uitgelogd.",
      description: "Graag tot ziens op het lab!",
      status: "success",
      duration: 5000,
      isClosable: true
    })
    return signOut(auth)
      .then(() => handleUser(false));
  };

  const sendPasswordResetEmail = (email) => {
    return sendResetEmail(auth, email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString('oobCode');

    return confirmReset(auth, resetCode, password)
      .then(() => {
        return true;
      });
  };

  //listen to auth token changes
  //call setUser and write new token as a cookie
  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'idToken', '', { path: '/' });
        nookies.set(undefined, 'uid', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'idToken', token, { path: '/' });
        nookies.set(undefined, 'uid', user.uid, { path: '/' });
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);


  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

const formatUser = (user, firstName, lastName) => {
  if(firstName && lastName) {
    return {
      uid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      provider: user.providerId,
      photoURL: user.photoURL,
    }
  } else {
    return {
      uid: user.uid,
      email: user.email,
      provider: user.providerId,
      photoURL: user.photoURL,
      displayName: user.displayName
    }
  }
}

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};