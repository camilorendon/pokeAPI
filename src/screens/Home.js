import React from 'react'
import firebaseApp from '../firebase/credenciales'
import {getAuth, signOut} from "firebase/auth"
import AdminView from "../Components/AdminView"
import UserView from "../Components/UserView"
const auth = getAuth(firebaseApp)
function Home({user}) {
return (
    <div>
    Home
    <button onClick={()=>signOut(auth)}>cerrar sesion</button>

    {user.rol === "admin" ? <AdminView/> : <UserView/> }
    </div>
)
}

export default Home
