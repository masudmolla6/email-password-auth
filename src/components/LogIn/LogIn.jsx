import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../../firebase/firebase.config';
import { Link } from 'react-router-dom';



const auth=getAuth(app)

const LogIn = () => {
      const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef=useRef()
      const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess("");
        setError("");
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // validate

        if (!/(?=.*[A-Z])/.test(password)) {
          setError("Please Enter At Least One Uppercase");
          return;
        } else if (!/(?=.*[0-9])/.test(password)) {
          setError("Please Enter At Least One number");
          return;
        } else if (password.length < 6) {
          setError("Please Enter 6 digit");
          return;
        }

          console.log(email, password);
          

          signInWithEmailAndPassword(auth, email, password)
              .then(result => {
                  const user = result.user;
                  setSuccess("User LogIn Successfully")
                  setError("")
              })
              .catch(error => {
                setError(error.message);  
              })
  };
  
  const handlePasswordReset = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please Provider Your Email Address to Reset Password.")
    }
    sendPasswordResetEmail(auth, email)
      .then(result => {
      alert("Please Check Your Email Address.")
      })
      .catch(error => {
      console.error(error);
    })
  }
    return (
      <div className="mt-10 text-center">
        <h1 className="text-3xl my-2">Please LogIn</h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <input
              className="w-96 text-xl text-center rounded-full mb-2"
              type="email"
              name="email"
              id="email"
              ref={emailRef}
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
          </form>
        </div>
        <p>{error}</p>
        <p>{success}</p>
        <p>
          <small>
            Forget Password? Please{" "}
            <button
              className="underline text-orange-500"
              onClick={handlePasswordReset}
            >
              {" "}
              Reset
            </button>
          </small>
        </p>
        <p>
          <small>
            New to This Website? Please
            <Link className="text-orange-700" to="/register">
              {" "}
              Register
            </Link>
          </small>
        </p>
      </div>
    );
};

export default LogIn;