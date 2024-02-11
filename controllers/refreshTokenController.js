// Import necessary dependencies
const User = require('../model/User'); // Importing the User model, likely representing user data
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for token verification

// Function to handle refresh token requests
const handleRefreshToken = async (req, res) => {
    // Extract cookies from the request
    const cookies = req.cookies;
    
    // Check if the 'jwt' cookie exists
    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized

    // Extract the refresh token from the cookie
    const refreshToken = cookies.jwt;

    // Find a user with the provided refresh token in the database
    const foundUser = await User.findOne({ refreshToken }).exec();

    // If no user is found with the provided refresh token, send a Forbidden status code
    if (!foundUser) return res.sendStatus(403); // Forbidden 

    // Verify the refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, // Verify the token using the secret key
        (err, decoded) => {
            // If there's an error or the decoded username doesn't match the user's username, send Forbidden status code
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            // If the token is valid, generate a new access token
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username // Include user information in the token payload
                    }
                },
                process.env.ACCESS_TOKEN_SECRET, // Sign the token using the access token secret
                { expiresIn: '5m' } // Set expiration time for the access token
            );

            // Send the new access token as a JSON response
            res.json({ accessToken });
        }
    );
}

// Export the handleRefreshToken function
module.exports = { handleRefreshToken };
