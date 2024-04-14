// // routes/userRoutes.js
// const express = require('express');
// const db = require('../config/db');
// const { hashPassword } = require('../utils/passwordUtils');

// const router = express.Router();

// router.post('/auth/login', (req, res) => {
//     const { username, password } = req.body;
//     console.log({ username, password })
//     const hashedPassword = hashPassword(password);

//     const user = { username, password: hashedPassword };

//     db.query('INSERT INTO users SET ?', user, (err, result) => {
//         if (err) {
//             console.error('Error registering user:', err);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }
//         res.status(201).json({ message: 'User registered successfully' });
//     });
// });

// module.exports = router;
