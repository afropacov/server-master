// Import necessary dependencies
const User = require('../model/User'); // Importing User model, presumably representing user data
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing and comparison
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for token generation
require('dotenv').config(); // Loading environment variables

// Function to handle user sign-in
const handleSignIn = async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find a user with the provided username in the database
    const foundUser = await User.findOne({ username: username }).exec();

    // If a user with the provided username is found
    if (foundUser) {
        // Compare the provided password with the hashed password stored in the database
        const match = bcrypt.compareSync(password, foundUser.password);
        
        // If passwords match
        if (match) {
            // Generate an access token containing user information
            const accessToken = jwt.sign({
                "UserInfo": { 'username': foundUser.username }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            // Generate a refresh token
            const refreshToken = jwt.sign(
                { 'username': foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Store the refresh token in the user's data and save it back to the database
            foundUser.refreshToken = refreshToken;
            const result = foundUser.save();

            // Set a cookie named 'jwt' containing the refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1000 * 60 * 60 * 24 });

            // Send a JSON response containing the access token and success message
            res.json({ 'accessToken': accessToken, 'message': 'Signed In Succesfully', 'photo': foundUser?.image });

            // Log the request body and sign-in message to the console
            console.log(req.body);
            console.log('Signed In');
        } else {
            // If passwords don't match, send a status code of 403 (Forbidden)
            return res.sendStatus(403);
        }
    } else {
        // If no user with the provided username is found, send a status code of 403 (Forbidden)
        return res.sendStatus(403);
    }
}

// Export the handleSignIn function to make it accessible from other modules
module.exports = { handleSignIn };
