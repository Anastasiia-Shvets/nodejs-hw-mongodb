import mongoose from 'mongoose';

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        rerquired: true,
        default: 'personal',
    },
},
    { timestamps: true }
);

export const ContactsCollection = mongoose.model('contacts', contactsSchema);

