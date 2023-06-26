import React, { useState } from 'react';
import { auth } from '../firebase';
import axios from 'axios';
import firebase from 'firebase/compat/app'; 
import 'firebase/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'normal',
        callback: (response) => {
          sendOTP();
        },
        'expired-callback': (error) => {
          console.error(error);
        },
      });

      const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:3500/send-otp', {
        phoneNumber,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);
      console.log('OTP verified successfully');
      console.log('Registering user...');

      const response = await axios.post('http://localhost:3500/register', {
        name,
        phoneNumber,
      });
      console.log(response.data);

      
      setName('');
      setPhoneNumber('');
      setOtp('');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="mt-5">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <div id="recaptcha-container"></div>
        <button type="submit" onClick={handleSendOTP}>
          Send OTP
        </button>
      </form>

      <form>
        <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Register;
