import { Schema, model, Types } from "mongoose";

const characterSchema = new Schema({
    characterName: {
        type: String,
        required: true,
    },
    characterClass: {
        type: String,
        required: true,
    },
    weaponDice: {
        type: String, 
        required: true,
    },
    attacks: {
        type: Number,
        required: true,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Character = model('Character', characterSchema);

export default Character;