
import React, { useState } from 'react'
import firebaseApp from '../firebase/credenciales';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {getFirestore, doc, setDoc}from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp)

function Login() {
const[isRegistrando, setRegistrando]= useState(false);

async function registrarUsusario(email, password, rol){
const infoUsuario = await createUserWithEmailAndPassword(auth,
    email,
    password,
    rol).then((usuarioFirebase)=>{
    return usuarioFirebase
});

    console.log(infoUsuario.user.uid)
    const docuRef= doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, {correo: email, rol:rol});
}

function submitHandler (e){
    e.preventDefault();
    const email= e.target.elements.email.value;
    const password= e.target.elements.password.value;
    const rol= e.target.elements.rol.value;
        console.log("submit", email, password, rol);
    if(isRegistrando){
        registrarUsusario(email, password, rol);
    }else{
        signInWithEmailAndPassword(auth, email, password);
    }
}

return (
    <div>
        <h1>{isRegistrando ? "registrate" : "inicia sesion" }</h1>
        <form onSubmit={submitHandler}>
            <label>
                correo:
                <input type="email" id='email'/>
            </label>
            <label>
                contraseña
                <input type="password" id='password'/>
            </label>
            <label>
                Rol:
                <select id='rol'>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>
            </label>
            <input type="submit" value={isRegistrando? "Registrar" : "Iniciar sesion"}/>
        </form>
        <button onClick ={()=> setRegistrando(!isRegistrando)}>
            {isRegistrando ? "ya tengo una cuenta" : "quiero registrarme"}
        </button>
    </div>
)
}

export default Login
