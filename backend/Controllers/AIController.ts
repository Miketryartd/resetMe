import { Request, Response } from 'express';
import Habits from '../Models/Habits.js';
import Prompts from '../Models/Prompts.js';

const open_router_key = process.env.OPENROUTER_API_KEY as string;

export const getAi = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const id = (req as any).user.id;

        if (!id) return res.status(401).json({ error: "Invalid credentials" });

        const habits = await Habits.find({ user_id: id });

        if (habits.length === 0) {
            const emptyResponse = {
                insight: "You don't have any habits yet! Start by adding your first habit to get personalized insights and track your progress. 🚀",
                stats: {
                    totalHabits: 0,
                    averageSuccessRate: 0,
                    totalCompletions: 0,
                    totalMisses: 0,
                    bestHabit: null,
                    worstHabit: null,
                },
                habitDetails: [],
                prompt: prompt || null,
            };

            if (prompt) {
                await Prompts.create({
                    user_id: id,
                    prompt_text: prompt,
                    ai_response: emptyResponse.insight,
                    stats_snapshot: emptyResponse.stats,
                });
            }

            return res.status(200).json(emptyResponse);
        }

        const habitStats = habits.map(h => {
            const progressArray = Array.isArray(h.progress) ? h.progress : [];
            const totalDays = progressArray.length;
            const keptDays = progressArray.filter((p: any) => p && p.kept === "yes").length;
            const missedDays = progressArray.filter((p: any) => p && p.kept === "no").length;
            const successRate = totalDays > 0 ? (keptDays / totalDays) * 100 : 0;

            return {
                habit: h.habit,
                category: h.category,
                goal: h.goal,
                startDate: h.startDate,
                endDate: h.endDate,
                notes: h.notes,
                totalDays,
                keptDays,
                missedDays,
                successRate: Math.round(successRate),
                progress: progressArray.map((p: any) => ({
                    date: p.date,
                    kept: p.kept,
                })),
            };
        });

        let bestHabit = null;
        let worstHabit = null;

        if (habitStats.length === 1) {
            bestHabit = { habit: habitStats[0].habit, successRate: habitStats[0].successRate };
            worstHabit = { habit: habitStats[0].habit, successRate: habitStats[0].successRate };
        } else if (habitStats.length > 1) {
            const best = habitStats.reduce((b, c) => c.successRate > b.successRate ? c : b, habitStats[0]);
            const worst = habitStats.reduce((w, c) => c.successRate < w.successRate ? c : w, habitStats[0]);
            bestHabit  = { habit: best.habit,  successRate: best.successRate };
            worstHabit = { habit: worst.habit, successRate: worst.successRate };
        }

        const overallStats = {
            totalHabits: habitStats.length,
            averageSuccessRate: habitStats.length > 0
                ? Math.round(habitStats.reduce((sum, h) => sum + h.successRate, 0) / habitStats.length)
                : 0,
            bestHabit,
            worstHabit,
            totalCompletions: habitStats.reduce((sum, h) => sum + h.keptDays, 0),
            totalMisses: habitStats.reduce((sum, h) => sum + h.missedDays, 0),
        };

        const userPrompt = prompt
            ? `User Question: ${prompt}\n\nHere are my habit statistics:\n${JSON.stringify(habitStats, null, 2)}\n\nOverall Stats:\n${JSON.stringify(overallStats, null, 2)}`
            : `Here are my habit statistics for analysis:\n${JSON.stringify(habitStats, null, 2)}\n\nOverall Stats:\n${JSON.stringify(overallStats, null, 2)}`;

        // ── OpenRouter via fetch (most reliable) ──────────────────
        const fetchResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${open_router_key}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Habit Tracker",
            },
            body: JSON.stringify({
                model: 'liquid/lfm-2.5-1.2b-thinking:free',
                messages: [
                    {
                        role: 'system',
                        content: `You are an AI habit coach and analytics expert. Your role is to:
                        1. Analyze user habit data and provide detailed insights
                        2. Answer specific questions about their habits
                        3. Give constructive feedback and actionable advice
                        4. Highlight patterns and trends in their behavior
                        5. Provide motivation based on their progress
                        
                        Format your responses with clear sections, use emojis for visual appeal, and always be supportive while honest.
                        If the user asks a specific question, focus your analysis on answering that question.`,
                    },
                    {
                        role: 'user',
                        content: userPrompt,
                    },
                ],
            }),
        });

        const completion = await fetchResponse.json() as any;

        const aiMessage =
            completion.choices?.[0]?.message?.content ||
            completion.choices?.[0]?.text ||
            "I'm having trouble analyzing your habits right now.";

        if (prompt && prompt.trim()) {
            try {
                const savedPrompt = await Prompts.create({
                    user_id: id,
                    prompt_text: prompt,
                    ai_response: aiMessage,
                    stats_snapshot: overallStats,
                });
                console.log('Prompt saved successfully:', savedPrompt._id);
            } catch (dbError) {
                console.error('Error saving prompt to database:', dbError);
            }
        }

        res.status(200).json({
            insight: aiMessage,
            stats: overallStats,
            habitDetails: habitStats,
            prompt: prompt || null,
        });

    } catch (error: any) {
        console.error('Error fetching ai response', error);
        return res.status(500).json({
            error: "Server error",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};

export const getPromptHistory = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id;
        if (!id) return res.status(401).json({ error: "Invalid credentials" });

        const prompts = await Prompts.find({ user_id: id })
            .sort({ created_at: -1 })
            .limit(50)
            .select('prompt_text ai_response created_at stats_snapshot');

        res.status(200).json({ prompts });

    } catch (error) {
        console.error('Error fetching prompt history', error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const deletePrompt = async (req: Request, res: Response) => {
    try {
        const id = (req as any).user.id;
        const { promptId } = req.params;

        if (!id) return res.status(401).json({ error: "Invalid credentials" });

        const deleted = await Prompts.findOneAndDelete({
            _id: promptId,
            user_id: id,
        });

        if (!deleted) {
            return res.status(404).json({ error: "Prompt not found" });
        }

        res.status(200).json({ message: "Prompt deleted successfully" });

    } catch (error) {
        console.error('Error deleting prompt', error);
        return res.status(500).json({ error: "Server error" });
    }
};