import mongoose, { Schema } from 'mongoose';

const roles = ['user', 'admin'];

const UsersSchema = new Schema({
    username:      { type: String, required: true },
    email:         { type: String, required: true, unique: true },
    password:      { type: String, required: true },
    contactNumber: { type: String, required: false },
    address:       { type: String, required: false },
    date:          { type: Date, default: Date.now },
    role:          { type: String, default: 'user', enum: roles },
});

const Users = mongoose.model('Users', UsersSchema);

export default Users;