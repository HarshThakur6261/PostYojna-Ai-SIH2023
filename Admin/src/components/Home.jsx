import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Home.module.css'; // Create a CSS module for styling

const Home = () => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <div className={styles.container}>
      <img src="/fullbanner.png" alt="" />
      <div className={styles.toggleGroup}>
        <button
          className={styles.toggleButton}
          onClick={() => navigate("/AddScheme")}
        >
          Add Scheme
        </button>
        <button
          className={styles.toggleButton}
          onClick={() => navigate("/AddLocation")}
        >
          Add Location
        </button>
        <button
          className={styles.toggleButton}
          onClick={() => navigate("/signup")}
        >
          Create Account
        </button>
        <button
          className={styles.toggleButton}
          onClick={() => navigate("/AccountData")}
        >
Accounts Data
        </button>
      </div>
=======
    <div>
      <button onClick={() =>{
        navigate("/AddScheme")
      }}>Add Scheme</button>


      <button onClick={() =>{
        navigate("/AddLocation")
      }}
      >Add Location</button>


      <button onClick={() =>{
        navigate("/signup")
      }}> Signup</button>

<button onClick={() =>{
        navigate("/OpenAccount")
      }}> Open Account</button>
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
    </div>
  );
};

export default Home;
