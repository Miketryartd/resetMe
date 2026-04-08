import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../Models/User.js';
import userSchema from '../ZodModels/UserSchema.js';

const jwt_secret_key = process.env.JWT_SUPER_SUPER_SECRET_SECRET_KEY_KIY as string;

export const createUser = async (req: Request, res: Response) => {
    try {
        const parsed = userSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.issues });
        }

        const { username, email, password } = parsed.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            jwt_secret_key,
            { expiresIn: '7d' }
        );

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const loggedUser = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id;
        const user = await Users.findById(id).select('username email');

        if (!user) {
            return res.status(401).json({ error: 'User is not logged in' });
        }

        return res.status(200).json({
            username: user.username,
            email: user.email,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};