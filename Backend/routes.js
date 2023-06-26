const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming you have a User model defined in a separate file

router.post('/login', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Find user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate OTP
    if (user.otp !== otp) {
      // Invalid OTP
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    // Generate JWT token
    const token = jwt.sign({ phoneNumber }, 'your_secret_key', {
      expiresIn: '1d', // Token expires in 1 day
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
