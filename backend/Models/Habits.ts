import mongoose, { Schema } from 'mongoose';

const HabitsSchema = new Schema({
    user_id:   { type: Schema.Types.ObjectId, ref: 'Users' },
    habit:     { type: String, required: true },
    category:  { type: String, required: true },
    startDate: { type: String, required: true },
    endDate:   { type: String, required: true },
    notes:     { type: String },
    goal:      { type: String, required: true },
    progress: [
        {
            date: String,
            kept: { type: String, enum: ['yes', 'no'] },
        },
    ],
});

const Habits = mongoose.model('Habits', HabitsSchema);

export default Habits;