import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3500/login', { phoneNumber, otp });
      console.log(response.data.message); // Login success message
    } catch (error) {
      console.log('Error logging in:', error.response.data.error);
    }
  };

  return (
    <div className='mt-5'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;



// // Login.js

// import React, { useState } from 'react';

// function Login() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOTP] = useState('');
//   const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   const handlePhoneNumberSubmit = async (e) => {
//     e.preventDefault();

//     // TODO: Perform validation on the phone number, e.g., format, length, etc.
//     if (!phoneNumber) {
//       setError('Please enter a valid phone number');
//       return;
//     }

//     // Assuming phone number is valid, move to OTP entry
//     setIsPhoneNumberSubmitted(true);
//   };

//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();

//     // TODO: Perform validation on the OTP, e.g., length, numeric, etc.
//     if (!otp) {
//       setError('Please enter a valid OTP');
//       return;
//     }

//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phoneNumber, otp }),
//       });

//       if (response.ok) {
//         const { token } = await response.json();
//         // TODO: Handle successful login and store the token
//       } else {
//         const error = await response.json();
//         setError(error.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Network error occurred');
//     }
//   };

//   return (
//     <div className='mt-5'>
//       <h1>Login</h1>
//       {error && <p>{error}</p>}
//       {!isPhoneNumberSubmitted ? (
//         <form onSubmit={handlePhoneNumberSubmit}>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="Phone Number"
//           />
//           <button type="submit">Submit Phone Number</button>
//         </form>
//       ) : (
//         <form onSubmit={handleOTPSubmit}>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOTP(e.target.value)}
//             placeholder="OTP"
//           />
//           <button type="submit">Submit OTP</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Login;
