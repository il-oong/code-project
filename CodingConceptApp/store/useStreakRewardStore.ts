import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createWebStorage from '../lib/storage/createWebStorage'; // 새로 생성한 웹 스토리지 임포트

// 웹 환경과 React Native 환경을 구분하여 AsyncStorage 또는 localStorage 사용
const storage = createJSONStorage(() => 
  Platform.OS === 'web' ? createWebStorage() : AsyncStorage
);

interface StreakRewardState {
  currentStreak: number;
  lastSessionDate: string | null;
  rewards: { [key: string]: boolean }; // 예: { "first_streak_reward": true }
  incrementStreak: () => void;
  resetStreak: () => void;
  earnReward: (rewardId: string) => void;
}

export const useStreakRewardStore = create<StreakRewardState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      lastSessionDate: null,
      rewards: {},

      incrementStreak: () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const { lastSessionDate, currentStreak } = get();

        if (lastSessionDate === null) {
          // 첫 세션
          set({ currentStreak: 1, lastSessionDate: today });
        } else {
          const lastDate = new Date(lastSessionDate);
          const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            // 연속 세션
            set({ currentStreak: currentStreak + 1, lastSessionDate: today });
          } else if (diffDays > 1) {
            // 스트릭 끊김
            set({ currentStreak: 1, lastSessionDate: today });
          }
          // 같은 날 여러 번 접속 시 스트릭 유지 (변경 없음)
        }
      },

      resetStreak: () => set({ currentStreak: 0, lastSessionDate: null }),

      earnReward: (rewardId: string) => {
        set((state) => ({
          rewards: {
            ...state.rewards,
            [rewardId]: true,
          },
        }));
      },
    }),
    {
      name: 'streak-reward-storage',
      storage: storage,
    }
  )
);
