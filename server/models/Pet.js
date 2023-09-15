const  {Schema, model} =require('mongoose');
const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
});
const Pet = model('pet', petSchema);

module.exports = Pet;