import { Router } from 'express';
import characterService from '../service/characterService.js';

const characterController = Router();

characterController.get('/', async (req, res) => {
    const characters = await characterService.getAll().lean();

    console.log(characters);
    
    res.json(characters);
});

characterController.post('/create', async (req, res) => {
    const characterData = req.body;
    const cookie = req.cookies['auth'];
    const userId = cookie._id;

    try {
        await characterService.create(characterData, userId);

        res.end();
    } catch (error) {
        console.error(error);

        res.status(503).end();
    }
});

export default characterController;