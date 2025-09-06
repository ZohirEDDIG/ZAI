import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async  (req, res) => {
  try {

    const { username, password } = req.body;
    const errors = { username: { message: '' }, password: { message: '' } };
 
    const usernameRegex = /^[a-zA-Z0-9\.-@_]{3,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;

    if (!username)  errors.username.message = 'Username is required';

    else {
      if (!username.match(usernameRegex)) {
        errors.username.message = 'Username must be at least 3 characters and contain only letters, numbers, ., _, @, -' ;
      }  else {
        const user = await User.findOne({ username });
        if (user) errors.username.message = 'Username already exists';
      }
    }

    if(!password) errors.password.message = 'Password is required';
    else {
      if (!password.match(passwordRegex)) {
        errors.password.message = 'Password must be 8-14 characters and include uppercase, lowercase, number' ;
      }
    }

    if (errors.username.message || errors.password.message ) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Failed to register ', error.message);
    return res.status(500).json({ error: 'Failed to register' });
  }
}

const login = async (req, res) =>  {
  try {

    const { username, password } = req.body;
    const errors = { username: { message: '' }, password: { message: '' } };

    if (!username) errors.username.message = 'Username is required';
    if (!password) errors.password.message = 'Password is required';

    if (errors.username.message || errors.password.message) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ username: username });
    if (!user)  {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h', });

    return res.status(200).json({ message: 'Logged in successfully', token: token });
  } catch (error) {
    console.error('Failed to login ', error.message);
    return res.status(500).json({ error: 'Failed to login' });
  }
}

export { register, login };