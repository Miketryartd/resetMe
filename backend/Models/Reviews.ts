import mongoose, { Schema } from 'mongoose';

const ReviewsSchema = new Schema({
    user:       { type: Schema.Types.ObjectId, ref: 'Users' },
    review:     { type: String, required: true },
    reviewedAt: { type: Date, default: Date.now },
});

const Reviews = mongoose.model('Reviews', ReviewsSchema);

export default Reviews;