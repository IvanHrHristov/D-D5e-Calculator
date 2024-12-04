import {Router} from 'express';
import userService from '../service/userService.js';

const userController = Router();

userController.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        const response = await userService.register(username, email, password, rePassword);
        
        res.cookie('auth', response, /*{httpOnly: true}*/);

        res.json(response);
    } catch (error) {
        console.error(error);

        res.status(503).end();
    }
});

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await userService.login(email, password);

        res.cookie('auth', response, /*{httpOnly: true}*/);
        
        res.json(response);
    } catch (error) {
        console.error(error);

        res.status(403).end();
    }
});

userController.get('/profile', async (req, res) => {
    try {
        const userId = req.cookies['auth']._id;

        const response = await userService.getProfile(userId);
    
        res.json(response);
        
    } catch (error) {
        console.error(error);

        res.end();
    }
});

userController.put('/profile', async (req, res) => {
    try {
        const userId = req.cookies['auth']._id;
        const userData = req.body;

        await userService.updateProfile(userId, userData);

        const response = await userService.getProfile(userId);

        res.json(response);

    } catch (error) {
        console.error(error);

        res.status(503).end();
    }
});

userController.post('/logout', (req,res) => {
    res.clearCookie('auth');

    res.end();
});

export default userController;