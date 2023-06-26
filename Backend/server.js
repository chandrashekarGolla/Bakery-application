const firebase = require('firebase/app');
require('firebase/auth');
const { RecaptchaVerifier } = require('firebase-admin/auth');
const firebaseConfig = {
  apiKey: "AIzaSyDuXwdmxiXU529kX9WHCFc_mKhscIYyxio",
  authDomain: "react-phone-auth-690ad.firebaseapp.com",
  projectId: "react-phone-auth-690ad",
  storageBucket: "react-phone-auth-690ad.appspot.com",
  messagingSenderId: "534157114079",
  appId: "1:534157114079:web:9b8b1c19941655f94c876a"
};

firebase.initializeApp(firebaseConfig);

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3500;


const mongoUrl = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2';
const dbName = 'bakeryDB';
let dbobj;
let cartCollectionobj
let usersCollectionobj
app.use(bodyParser.json());
app.use(cors());



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

MongoClient.connect(mongoUrl)
        .then((dbRef) => {
            dbobj = dbRef.db(dbName);
            usersCollectionobj = dbobj.collection('userCollection');
            cartCollectionobj=dbobj.collection('cartCollection')
            console.log("Mongodb connected succesfully")
        })
        .catch((err) => console.log("error in db connection", err))


app.get('/get-cartItems', async (req, res) => {
    try {
      const cartItems = await cartCollectionobj.find().toArray();
    //   console.log(cartItems)
      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.post('/cart', async (req, res) => {
    try {
      const { image, price, name ,itemid} = req.body;
      const cartItem = { image, price, name ,itemid};
      await cartCollectionobj.insertOne(cartItem);
      res.status(201).send('Item added to cart successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.delete('/cart/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log("in delet equesit",id)
      await cartCollectionobj.deleteOne({ itemid: parseInt(id) });
      res.json({ message: 'Item deleted from cart successfully.' }); 
    //   console.log("item deleted")
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Send OTP endpoint
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const verificationRequest = new RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: () => {
        sendOTP(phoneNumber);
      },
      'expired-callback': (error) => {
        console.error(error);
        res.status(500).json({ error: 'Error sending OTP' });
      },
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, verificationRequest)
      .then((confirmationResult) => {
        res.json({ message: 'OTP sent successfully', verificationId: confirmationResult.verificationId });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error sending OTP' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending OTP' });
  }
  // try {
  //   const verificationRequest = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  //     size: 'normal',
  //     callback: () => {
  //       sendOTP(phoneNumber);
  //     },
  //     'expired-callback': (error) => {
  //       console.error(error);
  //       res.status(500).json({ error: 'Error sending OTP' });
  //     },
  //   });

  //   firebase.auth().signInWithPhoneNumber(phoneNumber, verificationRequest)
  //     .then((confirmationResult) => {
  //       res.json({ message: 'OTP sent successfully', verificationId: confirmationResult.verificationId });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       res.status(500).json({ error: 'Error sending OTP' });
  //     });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Error sending OTP' });
  // }
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, phoneNumber } = req.body;

  try {
    // Store user data in MongoDB
    await usersCollectionobj.insertOne({ name, phoneNumber });

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// // Register endpoint
// app.post('/register', (req, res) => {
//   const { name, phoneNumber } = req.body;
//   const otp = Math.floor(1000 + Math.random() * 9000);

//   // Send OTP via SMS
//   twilioClient.messages
//     .create({
//       body: `Your OTP for bakery app registration is: ${otp}`,
//       from: '6281946615',
//       to: phoneNumber,
//     })
//     .then(() => {
//       // Store user details in the database
//       MongoClient.connect(mongoUrl, (err, client) => {
//         if (err) {
//           console.log('Error connecting to MongoDB:', err);
//           res.status(500).json({ error: 'Failed to register user.' });
//         } else {
//           const db = client.db(dbName);
//           const usersCollectionobj = db.collection('usersCollection');
//           const newUser = { name, phoneNumber, otp };

//           usersCollectionobj.insertOne(newUser, (err, result) => {
//             if (err) {
//               console.log('Error storing user details:', err);
//               res.status(500).json({ error: 'Failed to register user.' });
//             } else {
//               res.status(200).json({ message: 'User registered successfully.' });
//             }
//           });

//           client.close();
//         }
//       });
//     })
//     .catch((err) => {
//       console.log('Error sending OTP:', err);
//       res.status(500).json({ error: 'Failed to register user.' });
//     });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//     const { phoneNumber, otp } = req.body;

//     // Check if user exists in the database
//     MongoClient.connect(mongoUrl, (err, client) => {
//         if (err) {
//             console.log('Error connecting to MongoDB:', err);
//             res.status(500).json({ error: 'Failed to log in.' });
//         } else {
//             const db = client.db(dbName);
//             const usersCollectionobj = db.collection('usersCollection');

//             usersCollectionobj.findOne({ phoneNumber }, (err, user) => {
//                 if (err) {
//                     console.log('Error retrieving user details:', err);
//                     res.status(500).json({ error: 'Failed to log in.' });
//                 } else {
//                     if (!user) {
//                         res.status(400).json({ error: 'Phone number does not exist. Please register first.' });
//                     } else if (user.otp !== otp) {
//                         res.status(400).json({ error: 'Invalid OTP.' });
//                     } else {
//                         res.status(200).json({ message: 'User logged in successfully.' });
//                     }
//                 }
//             });

//             client.close();
//         }
//     });
// });
