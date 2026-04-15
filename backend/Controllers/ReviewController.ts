import { Request, Response } from 'express';
import Reviews from '../Models/Reviews.js';
import reviewSchena from "../ZodModels/ReviewSchema.js";

export const createReview = async (req: Request, res: Response) => {
    try {
        const parsed = reviewSchena.safeParse(req.body);
       if (!parsed.data) return res.status(404).json({error: "Missing review"});
        const { review } = parsed.data;
        const id = (req as any).user.id;

        if (!id) return res.status(401).json({ error: 'Invalid credentials' });

        const newReview = new Reviews({ user: id, review });
        await newReview.save();

        res.status(200).json(newReview);
        console.log('Successfully added', newReview);

    } catch (error) {
        console.error('Error adding review', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getReviews = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 8;
        const reviews = await Reviews.find()
            .populate('user', 'username email')
            .limit(limit);

        return res.status(200).json(reviews);

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllReviews = async (req: Request, res: Response) => {

    try{

        const reviews = await Reviews.find({}).populate('user', 'name email username').sort({reviewedAt: -1});
        return res.status(200).json(reviews);
    } catch (error){
        console.error('Error fetchinga ll reviews');
        res.status(500).json({error: "Server error"});
    }
}