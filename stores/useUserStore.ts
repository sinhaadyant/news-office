import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isLoggedIn: boolean;
  isSubscriber: boolean;
  loginAsFree: () => void;
  loginAsPaid: () => void;
  logout: () => void;
  // Paywall methods
  canViewFullContent: (isPremium: boolean) => boolean;
  shouldShowAds: () => boolean;
  getContentPreview: (content: string, isPremium: boolean) => string;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get): UserState => ({
      isLoggedIn: false,
      isSubscriber: false,

      loginAsFree: () =>
        set({
          isLoggedIn: true,
          isSubscriber: false,
        }),

      loginAsPaid: () =>
        set({
          isLoggedIn: true,
          isSubscriber: true,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          isSubscriber: false,
        }),

      // Paywall logic
      canViewFullContent: (isPremium: boolean): boolean => {
        const state = get();
        if (!isPremium) return true; // Free articles always accessible
        return state.isLoggedIn && state.isSubscriber; // Premium articles only for paid users
      },

      shouldShowAds: (): boolean => {
        const state = get();
        return state.isLoggedIn && !state.isSubscriber; // Show ads only for free users
      },

      getContentPreview: (content: string, isPremium: boolean): string => {
        const state = get();
        if (!isPremium || state.canViewFullContent(isPremium)) {
          return content; // Return full content
        }

        // Return preview for premium content (first 200 words)
        const words = content.split(' ');
        const previewWords = words.slice(0, 200);
        return previewWords.join(' ') + '...';
      },
    }),
    {
      name: 'user-store', // unique name for localStorage key
      // Only persist the essential state
      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
        isSubscriber: state.isSubscriber,
      }),
    }
  )
);
