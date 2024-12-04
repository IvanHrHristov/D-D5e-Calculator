import Character from "../models/Character.js";

const characterService = {
    getOne(characterId) {
        return Character.findById(characterId);
    },
    getAll() {
        return Character.find();
    },
    create(characterData, userId) {
        return Character.create({...characterData, owner: userId});
    },
    edit(characterId, characterData) {
        return Character.findByIdAndUpdate(characterId, characterData, {runValidators: true});
    },
    delete(characterId) {
        return Character.findByIdAndDelete(characterId);
    }
}

export default characterService;