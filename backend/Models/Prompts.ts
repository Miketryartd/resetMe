import mongoose, { Schema } from 'mongoose';

const PromptsSchema = new Schema({
    user_id:        { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    prompt_text:    { type: String, required: true },
    ai_response:    { type: String, required: true },
    created_at:     { type: Date, default: Date.now },
    stats_snapshot: { type: Object, default: null },
});

PromptsSchema.index({ user_id: 1, created_at: -1 });

const Prompts = mongoose.model('Prompts', PromptsSchema);

export default Prompts;