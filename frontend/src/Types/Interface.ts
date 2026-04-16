// types.ts
export interface User {
    username: string;
    email: string;
    date: string;
}

export enum UserKept {
    YES = "yes",
    NO = "no"
}

export interface Progress {
    date: string;
    kept: UserKept;
}

export interface UserStat {
    _id?: string;
    habit?: string;
    category?: string;
    kept?: UserKept;
    startDate: string;
    endDate: string;
    notes: string;
    goal: string;
    progress: Progress[];
}

export interface StatisticsProps {
    habits: UserStat[];
    loading?:boolean;
}

export interface RenderedHabitsProps {
    habits: UserStat[];
}

export interface UserCalendarProps {
    habits: UserStat[];
    onRefresh: () => void;
}

export interface Review{
    review?: string;
   user: User;
   reviewedAt: string;

}

export interface Stats {
    totalHabits: number;
    averageSuccessRate: number;
    totalCompletions: number;
    totalMisses: number;
    bestHabit?: {
        habit: string;
        successRate: number;
    };
    worstHabit?: {
        habit: string;
        successRate: number;
    };
}

export interface UserPrompt {
    _id?: string,
    user_id?: string,
    prompt_text?: string,
    ai_response?: string,
    stats_snapshot?: Stats[],
    created_at?: string;
}
export interface AuthSideBarProps {
    variant?: "signup" | "signin";
  }


  export interface PopulatedUser {
    _id: string;
    name?: string;
    username?: string;
    email?: string;
  }
  export interface ReviewProps {
    _id: string;
    user: string | PopulatedUser;
    review: string;
    reviewedAt: string;
  }