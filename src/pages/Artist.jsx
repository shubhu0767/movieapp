import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';


const Artist = () => {
  const [user, loading, error] = useAuthState(auth);
  // console.log(user.photoURL);
  return (
    <div className='text-center text-white text-lg'>
      <h1>Artist</h1>
      {user && <img src={user.photoURL} className='rounded-full' referrerPolicy="no-referrer" alt="userImg" />}
    </div>
  )
}

export default Artist