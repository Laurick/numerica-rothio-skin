import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StatsState {
    numbersSubmited: number;
    numbersFailed: number;
    timeoutedUsers: Record<string, number>;
    activeUsers: Record<string, number>;
    maxTimeoutValue: number;
    maxTimeoutUser: string;
    maxScore: number;
    maxScoreUser: string;

    setStatsMaxScore: (score: number, user: string) => void;
    setStatsMaxTimeout: (time: number, user: string) => void;
    setStatsTimeoutedUser: (user: string) => void;
    setStatsNumberSubmitedBy: (user: string) => void;
    getMaxValueOf: (record: Record<string, number>) => string;
}

const useStats = create(
    persist<StatsState>(
        (set) => ({
            numbersSubmited: 0,
            numbersFailed: 0,
            timeoutedUsers: {},
            activeUsers: {},
            maxTimeoutValue: 0,
            maxTimeoutUser: "-",
            maxScore: 0,
            maxScoreUser: "-",

            setStatsMaxScore: (score, user) => {
                set((state) => {
                    if (score > state.maxScore) {
                        return { maxScore: score, maxScoreUser: user };
                    }
                    return {};
                })
            },
            setStatsMaxTimeout: (time, user) => {
                set((state) => {
                    if (time > state.maxTimeoutValue) {
                        return { maxTimeoutValue: time, maxTimeoutUser: user };
                    }
                    return {};
                })
            },
            setStatsTimeoutedUser: (user) => set((state) => ({
                numbersFailed: state.numbersFailed + 1,
                timeoutedUsers: {
                    ...state.timeoutedUsers,
                    [user]: (state.timeoutedUsers[user] || 0) + 1,
                },
            })),
            setStatsNumberSubmitedBy: (user) =>
                set((state) => ({
                    numbersSubmited: state.numbersSubmited + 1,
                    activeUsers: {
                        ...state.activeUsers,
                        [user]: (state.activeUsers[user] || 0) + 1,
                    },
                })),
            getMaxValueOf: (record) => {
                let maxKey = "";
                let maxValue = -Infinity;

                for (const [key, value] of Object.entries(record)) {
                    if (value > maxValue) {
                        maxValue = value;
                        maxKey = key;
                    }
                }

                return maxKey;
            },
        }),
        { name: "numerica-stats", version: 1 }
    )
);

export default useStats;
