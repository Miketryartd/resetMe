import { z } from 'zod';

const reviewSchema = z.object({
  review: z.string()
});

export default reviewSchema;