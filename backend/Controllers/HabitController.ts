import { Request, Response } from 'express';
import Habits from '../Models/Habits.js';
import Users from '../Models/User.js';

export const createHabit = async (req: Request, res: Response) => {
    try {
        console.log("1. Route hit");

        const id = (req as any).user.id;
        console.log("2. User id from token:", id);

        const userId = await Users.findById(id);
        console.log("3. User found:", userId);

        if (!userId) return res.status(401).json({ error: "User is not logged in" });

        const { habit, category, startDate, endDate, notes, goal } = req.body;
        console.log("4. Body received:", req.body);

        if (!habit || !category || !startDate || !endDate) {
            console.log("5. Validation failed — missing fields");
            return res.status(400).json({ error: "Missing required inputs" });
        }

        const newHabit = new Habits({
            user_id: id,
            habit,
            category,
            startDate,
            endDate,
            notes,
            goal,
        });

        console.log("6. About to save:", newHabit);
        await newHabit.save();
        console.log("7. Saved successfully!");

        res.status(201).json({ message: 'Habit created successfully', habit: newHabit });

    } catch (err: any) {
        console.error("CAUGHT ERROR:", err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

export const userHabits = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id;
        const USER_ME_HABITS = await Habits.find({ user_id: id });

        if (!USER_ME_HABITS || USER_ME_HABITS.length === 0) {
            return res.status(200).json([]);
        }

        const habits = USER_ME_HABITS.map(h => ({
            _id: h._id,
            habit: h.habit,
            category: h.category,
            startDate: h.startDate,
            endDate: h.endDate,
            notes: h.notes,
            goal: h.goal,
            progress: h.progress,
        }));

        return res.status(200).json(habits);

    } catch (error) {
        console.error('Error fetching data from database', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const updateHabitProgress = async (req: Request, res: Response) => {
    try {
        const habitId = req.params.id;
        const userId = (req as any).user.id;
        const { date, kept } = req.body;

        const habit = await Habits.findOne({ _id: habitId, user_id: userId });

        if (!habit) {
            return res.status(404).json({ error: "Habit not found" });
        }

        const existingProgressIndex = habit.progress.findIndex(
            (p: any) => p.date === date
        );

        if (existingProgressIndex >= 0) {
            habit.progress[existingProgressIndex].kept = kept;
        } else {
            habit.progress.push({ date, kept });
        }

        await habit.save();
        res.status(200).json(habit);

    } catch (error) {
        console.error('Error updating habit progress:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateNotes = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;
        const userId = (req as any).user.id;

        const habit = await Habits.findOneAndUpdate(
            { _id: id, user_id: userId },
            { notes },
            { new: true }
        );

        if (!habit) return res.status(400).json({ error: "Habit not found" });
        res.status(200).json(habit);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};