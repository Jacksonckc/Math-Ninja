import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, store } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userCollectionRef = collection(store, 'users');
  useEffect(() => {
    const getUserDataFromFB = async () => {
      const id = JSON.parse(localStorage.getItem('user')).id;
      !id && navigate('/Signin');
      await getDoc(doc(userCollectionRef, id));
      // This won't work when you have an account and sign in because lname and fname will be lost from register.
      setUser((await getDoc(doc(userCollectionRef, id))).data());
    };
    getUserDataFromFB();
  }, []);

  console.log(user);
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      navigate('/SignIn');
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <h1>
        Welcome {user?.fname} {user?.lname} to Math Ninja!
      </h1>
      <p>Are you ready for the adventure?</p>
      <div>Your email: {user?.email}</div>
      <br />
      <hr />

      <br />
      <button onClick={(event) => handleSignOut(event)}>Log Out</button>
    </div>
  );
};

export default Profile;
