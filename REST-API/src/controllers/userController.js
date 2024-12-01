import {Router} from 'express';
import userService from '../service/userService.js';

const userController = Router();

userController.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        const response = await userService.register(username, email, password, rePassword);
        
        res.cookie('auth', response, {httpOnly: true});

        res.json(response);
    } catch (error) {
        console.error(error);
    }
});

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await userService.login(email, password);

        res.cookie('auth', response, {httpOnly: true});
        
        res.json(response);
    } catch (error) {
        console.error(error);
    }
});

userController.get('/profile', async (req, res) => {
    const cookie = req.cookies['auth'];

    try {
        const response = await userService.getProfile(cookie.email);
    
        res.json(response);
        
    } catch (error) {
        console.error(error);
    }
});

userController.post('/logout', (req,res) => {
    res.clearCookie('auth');

    res.end();
});

export default userController;