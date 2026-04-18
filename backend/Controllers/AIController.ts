import { Request, Response } from 'express';
import Habits from '../Models/Habits.js';
import Prompts from '../Models/Prompts.js';

const open_router_key = process.env.OPENROUTER_API_KEY as string;


const FREE_MODELS = [
    'mistralai/mistral-7b-instruct:free',      
    'google/gemini-2.0-flash-exp:free',       
    'meta-llama/llama-3.2-3b-instruct:free',   
    'microsoft/phi-3.5-mini-128k-instruct:free', 
    'qwen/qwen-2.5-7b-instruct:free',          
    'liquid/lfm-2.5-1.2b-thinking:free',       
];

// Local fallback responses when all APIs fail
const getLocalFallbackResponse = (prompt: string | null, stats: any) => {
    if (prompt && prompt.toLowerCase().includes('progress')) {
        return ` **Your Progress Summary**

Based on your habit data:
- Total Habits: ${stats.totalHabits}
- Success Rate: ${stats.averageSuccessRate}%
- Completed: ${stats.totalCompletions} days
- Missed: ${stats.totalMisses} days

${stats.bestHabit ? ` Best Habit: ${stats.bestHabit.habit} (${stats.bestHabit.successRate}% success rate)` : ''}
${stats.worstHabit ? ` Needs Improvement: ${stats.worstHabit.habit} (${stats.worstHabit.successRate}% success rate)` : ''}

Keep going! Consistency is key to building lasting habits. `;
    }
    
    if (prompt && prompt.toLowerCase().includes('motivation')) {
        return ` **Stay Motivated!**

You've completed ${stats.totalCompletions} habit days! Every small step counts toward your goals.

Remember: Progress, not perfection. Keep showing up, and you'll see amazing results. You've got this! 🚀`;
    }
    
    return `📈 **Your Habit Analysis**

Total Habits: ${stats.totalHabits}
Average Success Rate: ${stats.averageSuccessRate}%
Total Completions: ${stats.totalCompletions}
Total Misses: ${stats.totalMisses}

${stats.bestHabit ? ` Best performing: ${stats.bestHabit.habit}` : ''}
${stats.worstHabit ? ` Focus area: ${stats.worstHabit.habit}` : ''}

The AI service is currently experiencing high demand. Here's your basic stats analysis. Check back soon for detailed insights! 🔄`;
};


const callOpenRouter = async (model: string, messages: any[], timeout = 30000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const HOST = process.env.HOST || `http://localhost:3000`;
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${open_router_key}`,
                "Content-Type": "application/json",
                "HTTP-Referer": HOST as string,
                "X-Title": "Habit Tracker",
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                max_tokens: 1000,
                temperature: 0.7,
            }),
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
        
        return await response.json();
    } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Timeout after ${timeout}ms for model ${model}`);
        }
        throw error;
    }
};

export const getAi = async (req: Request, res: Response) => {
    try {
        console.log("test terminal");
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
            bestHabit = { habit: best.habit, successRate: best.successRate };
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

        const messages = [
            {
                role: 'system',
                content: `You are an AI habit coach and analytics expert. Your role is to:
                1. Analyze user habit data and provide detailed insights
                2. Answer specific questions about their habits
                3. Give constructive feedback and actionable advice
                4. Highlight patterns and trends in their behavior
                5. Provide motivation based on their progress
                6. Be Brutally Honest to the user.
                
                Format your responses with clear sections, use emojis for visual appeal, and always be supportive while honest.
                If the user asks a specific question, focus your analysis on answering that question.
                
                Keep responses concise but informative (under 500 words).`,
            },
            {
                role: 'user',
                content: userPrompt,
            },
        ];

        let aiMessage: string | null = null;
        let lastError: any = null;

     
        for (const model of FREE_MODELS) {
            try {
                console.log(`Attempting to use model: ${model}`);
                
           
                if (!open_router_key || open_router_key === '') {
                    throw new Error('OpenRouter API key is not configured');
                }
                
                const completion = await callOpenRouter(model, messages, 25000);
                
                aiMessage = completion.choices?.[0]?.message?.content ||
                           completion.choices?.[0]?.text;
                
                if (aiMessage) {
                    console.log(`Successfully used model: ${model}`);
                    break;
                }
            } catch (error: any) {
                console.error(`Model ${model} failed:`, error.message);
                lastError = error;
           
            }
        }

        if (!aiMessage) {
            console.warn('All AI models failed, using local fallback response');
            aiMessage = getLocalFallbackResponse(prompt, overallStats);
            
          
            aiMessage = ` *Note: AI service is currently experiencing high demand*\n\n${aiMessage}\n\n---\n* Tip: Try again in a few minutes for more detailed AI-powered insights!*`;
        }

   
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
        console.error('Error in getAi:', error);
        
        res.status(200).json({
            insight: "I'm having trouble connecting to the AI service right now. Please try again in a few minutes. In the meantime, keep tracking your habits! ",
            stats: null,
            habitDetails: null,
            prompt: req.body.prompt || null,
            error: "Service temporarily unavailable",
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