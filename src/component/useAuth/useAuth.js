import React, { useContext, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

const getUser = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    name: displayName,
    email: email,
    photo: photoURL,
  };
};

const Auth = () => {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
        window.history.back();
      })
      .catch((err) => setUser({ error: err.message }));
  };

  const signUp = (email, password, name) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            setUser(res.user);
            window.history.back();
          });
      })
      .catch((err) => {
        console.log(err.message);
        setUser(null);
        return err.message;
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const currUser = getUser(usr);
        setUser(currUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return { user, signIn, signUp, signOut };
};

export default Auth;
