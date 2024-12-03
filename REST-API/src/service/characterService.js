import Character from "../models/Character.js";

const characterService = {
    getOne(characterId) {

    },
    getAll() {
        return Character.find();
    },
    create(characterData, userId) {
        return Character.create({...characterData, owner: userId});
    }
}

export default characterService;