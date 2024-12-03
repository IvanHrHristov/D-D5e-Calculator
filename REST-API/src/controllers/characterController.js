import { Router } from 'express';
import characterService from '../service/characterService.js';

const characterController = Router();

characterController.post('/create', async (req, res) => {
    const characterData = req.body;
    const cookie = req.cookies['auth'];
    const userId = cookie._id;

    console.log(`Cookie: ${cookie}`);
    
    console.log(userId);
    

    try {
        await characterService.create(characterData, userId);

        res.end();
    } catch (error) {
        console.error(error);

        res.status(503).end();
    }
});

export default characterController;