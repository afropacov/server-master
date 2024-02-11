// Import necessary dependencies
const User = require('../model/User'); // Importing the User model, presumably representing user data
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing

// Function to handle registration of a new user
const handleNewUser = async (req, res) => {
    // Log the request object for debugging purposes
    console.log(req);

    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if there's already a user with the same username
    const duplicate = await User.findOne({ username: username }).exec();

    // If a user with the same username already exists, return an error response
    if (duplicate) return res.status(409).json({ 'error': 'This username already exists!' });

    // If the username is unique, hash the password and create a new user in the database
    const result = await User.create({
        'username': username, // Store the username
        'password': await bcrypt.hash(password, 10), // Hash the password using bcrypt
    });

    // Retrieve all users from the database (for debugging purposes)
    const res2 = await User.find();
    console.log(result); // Log the result of creating the new user
    console.log(res2); // Log the result of retrieving all users from the database

    // Send a success message back to the client
    return res.status(200).json({ 'message': 'Registered Successfully!' });
}

// Export the handleNewUser function
module.exports = { handleNewUser };
