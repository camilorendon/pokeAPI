import React, { useState } from 'react';
import Main from './Components/Main';
import './Components/style.css'
import Home from './screens/Home';
import Login from './screens/Login';

import firebaseApp from './firebase/credenciales';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {getFirestore, doc, getDoc} from "firebase/firestore"
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp)

function App() {
  const[user, setUser] = useState(null)

  async function getRol(uid){
    const docuRef = doc(firestore, `usuarios/${uid}`)
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function establecerInfoUsuario(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol)=>{
      const userData ={
        uid: usuarioFirebase.uid,
        email: usuarioFirebase,
        rol : rol,
      };
      setUser(userData);
      console.log("userData final", userData)
    });
  }
  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){
      if(!user){
        establecerInfoUsuario(usuarioFirebase);

      }
    }else{
      setUser(null);
    }
  });
  return (
    <>
      {user ? <Home user={user} /> : <Login/>}
      <Main/>
    </>
  );
}

export default App;
