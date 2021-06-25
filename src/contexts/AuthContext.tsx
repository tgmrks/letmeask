import { useEffect } from "react"
import { useState } from "react"
import { createContext, ReactNode } from "react"
import { firebase, auth } from "../services/firebase"

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();//state initialized as undefined 
    /* 1 - which func. to exec.  
       2 - when to execute (is always an array)
          within it what info should be monitores
          if it is empty it only runs one time
                .  *1  .  2 .
      useEffect(() => {}, [] ); */
  
      //reloading user auth information when the screen is reloaded
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid } = user;
  
          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
          });
        }
      });
  
      //unsubscribing from event listener (good practice)
      return () => {
        unsubscribe();
      }
    }, []);
  
    async function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
  
      /*  changed sintax below to async await:
      auth.signInWithPopup(provider).then(result => { 
           if (result.user) {
             ... */
      const result = await auth.signInWithPopup(provider);
  
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}