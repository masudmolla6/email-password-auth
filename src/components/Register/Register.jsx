import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from "firebase/auth"
import app from '../../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, email, password);

    //password validate
    if (!/(?=.*[A-Z])/.test(password)) {
      setError('Please Enter At lest One Uppercase');
      return;
    }
    else if (!/(?=.*[0-9])/.test(password)) {
      setError("Please Enter At lest One number");
      return;
    }
    else if(password.length < 6){
      setError('Please Enter At lest 6 digit');
      return;
    }


      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setError("");
          form.reset();
          setSuccess("User Has been Created Successfully");
          verifyEmail(user);
          updateUserData(user, name);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
  }

  const verifyEmail = (user) => {
    sendEmailVerification(user)
      .then(result => {
        console.log(result);
        alert("Please verify Your Email Account");
      })
      .catch(error => {
      console.error(error);
    })
  }

  const updateUserData = (user, name) => {
    updateProfile(user, { displayName: name })
      .then(() => {
      console.log("user name updated");
      })
    .catch(error=>{
      setError(error.message);
    })
  }

    return (
      <div className="mt-10 text-center">
        <h1 className="text-3xl my-2">Please Register</h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <input
              className="w-96 text-xl text-center rounded-full mb-2"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              required
            />
            <br />
            <input
              className="w-96 text-xl text-center rounded-full mb-2"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              required
            />
            <br />
            <input
              className="w-96 text-xl text-center rounded-full mb-2"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              required
            />
            <br />
            <input
              className="text-xl bg-emerald-400 text-black px-8 rounded-full py-1"
              type="submit"
              value="Register"
            />
            <p>
              <small>
                Already You Have an Account?
                <Link className='text-orange-500' to="/login"> LogIn</Link>
              </small>
            </p>
            <p>{error}</p>
            <p>{success}</p>
          </form>
        </div>
      </div>
    );
};

export default Register;