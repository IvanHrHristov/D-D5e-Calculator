import jwt from '../lib/jwt.js';
import bcrypt from 'bcrypt';

import User from "../models/User.js"

const userService = {
    async register(username, email, password, rePassword) {
        //Check if user exists
        if(password !== rePassword) {
            throw new Error('Password missmatch!');
        }

        const user = await User.findOne({ $or: [{email}, {username}] });

        if(user) {
            throw new Error('User already exists');
        }

        const newUser = await User.create({username, email, password});

        return this.generateResponse(newUser);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if(!user){
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) {
            throw new Error('Invalid email or password');
        }

        return this.generateResponse(user);
    }, 
    async getProfile(email) {
        const user = await User.findOne({ email });
        
        return this.generateResponse(user);
    },
    async generateResponse(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
        };

        const header = {expiresIn: '2h'};

        const token = await jwt.sign(payload, process.env.JWT_SECRET, header);

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
        };
    }
}

export default userService;