import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const cUser = { ...user, ...JSON.parse(localStorage.getItem('user')) };
    user && localStorage.setItem('user', JSON.stringify(cUser));
  }, [user]);

  return (
    <div>
      <h1>
        Welcome {user?.fname} {user?.lname} to Math Ninja!
      </h1>
      <p>Are you ready for the adventure?</p>
      <div>Your email: {user?.email}</div>
      <br />
      <hr />
    </div>
  );
};

export default Profile;
