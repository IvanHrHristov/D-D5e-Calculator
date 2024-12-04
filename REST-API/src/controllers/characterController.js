import { Router } from 'express';
import characterService from '../service/characterService.js';

const characterController = Router();

characterController.get('/', async (req, res) => {
    const characters = await characterService.getAll().lean();

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

characterController.get('/details/:characterId', async (req, res) => {
    const character = await characterService.getOne(req.params.characterId).lean();

    res.json(character);
});

characterController.put('/edit/:characterId', async (req, res) => {
    const character = req.body;
    const characterId = req.params.characterId;

    try {
        await characterService.edit(characterId, character);

        res.end();
    } catch (error) {
        console.error(error);
        
        res.status(503).end();
    }
});

characterController.delete('/delete/:characterId', async (req, res) => {
    const characterId = req.params.characterId;

    try {
        await characterService.delete(characterId);

        res.end();
    } catch (error) {
        console.error(error);
        
        res.status(503).end();
    }
});

characterController.get('/like/:characterId', async (req, res) => {
    const characterId = req.params.characterId;
    const cookie = req.cookies['auth'];
    const userId = cookie._id;

    try {
        await characterService.like(characterId, userId);

        res.end();
    } catch (error) {
        console.error(error);
        
        res.status(503).end();
    }
});

characterController.get('/removeLike/:characterId', async (req, res) => {
    const characterId = req.params.characterId;
    const cookie = req.cookies['auth'];
    const userId = cookie._id;

    try {
        await characterService.removeLike(characterId, userId);

        res.end();
    } catch (error) {
        console.error(error);
        
        res.status(503).end();
    }
});

export default characterController;