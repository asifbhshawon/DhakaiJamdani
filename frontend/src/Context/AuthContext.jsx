// import { createContext, useContext, useEffect } from "react";
// import { useState } from "react";

// const AuthContext = createContext(null);

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     const auth = '';
    
//     return unsubscribe;
//   }, []);

//   // signup function
//   async function signup(email, password, userName) {
//     const auth = '';
//     try {
//       await createUserWithEmailAndPassword(auth, email, password)
//     }
//     catch(error) {
//         if (error.code === 'auth/email-already-in-use') {
//           alert('This email address is already in use. Please try with a different email address.');
//         }
//       }

//     // updating the profile
//     await updateProfile(auth.currentUser, {
//       displayName: userName,
//     });

//     const user = auth.currentUser;
//     setCurrentUser({
//       ...user,
//     });
//   }

//   // login function
//   function login(email, password) {
//     const auth = getAuth();
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   // logout function
//   function logout() {
//     const auth = getAuth();
//     return signOut(auth);
//   }

//   const context = { currentUser, signup, login, logout };

//   return (
//     <AuthContext.Provider value={context}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }
