// userStore.ts
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { IUserState } from "../interfaces/user/IUserInterface"
import { axiosPublic } from "../utils/axiosConfig";

interface IUserStore extends IUserState {
    isLoading: boolean;
    isLoggedIn: boolean;
    isInitialized: boolean;
    toggleFavorite: (movieId: number) => void;
    initializeAuth: () => Promise<void>;
    logout: () => void;
}

export const useUserStore = create<IUserStore>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            isLoggedIn: false,
            isInitialized: false,

            setUser: (user) => set({ user: user, isLoggedIn: !!user }),

            toggleFavorite: async (movieId: number) => {
                const user = get().user;
                if (!user) return;

                try {
                    const resp = await axiosPublic.post(`/favorites/toggle/${movieId}`, {}, {
                        withCredentials: true,
                    });

                    if (resp.data.success && resp.data.user) {
                        set({ user: resp.data.user });
                    }
                } catch (error) {
                    console.error("Error toggling favorite:", error);
                    // Fallback: Lokale Aktualisierung bei Fehler
                    const alreadyLiked = user?.favorites?.includes(movieId);
                    const updatedFavorites = alreadyLiked
                        ? user?.favorites?.filter((id) => id !== movieId)
                        : [...(user?.favorites || []), movieId];

                    set({ user: { ...user, favorites: updatedFavorites } });
                }
            },

            initializeAuth: async () => {
                if (get().isInitialized) return;

                set({ isLoading: true, isInitialized: true });

                try {
                    const resp = await axiosPublic.get("/auth/currentUser", {
                        withCredentials: true,
                    });

                    if (resp.data && resp.data._id) {
                        set({
                            user: resp.data,
                            isLoading: false,
                            isLoggedIn: true
                        });
                    } else {
                        set({
                            user: null,
                            isLoading: false,
                            isLoggedIn: false
                        });
                    }
                } catch (error) {
                    console.error("Error in initializeAuth:", error);
                    set({
                        user: null,
                        isLoading: false,
                        isLoggedIn: false
                    });
                }
            },

            reloadUser: async () => {
                set({ isLoading: true });
                try {
                    const resp = await axiosPublic.get("/currentUser", {
                        withCredentials: true,
                    });


                    if (resp.data && resp.data._id) {
                        set({
                            user: resp.data,
                            isLoading: false,
                            isLoggedIn: true
                        });
                    } else {
                        set({
                            user: null,
                            isLoading: false,
                            isLoggedIn: false
                        });
                    }
                } catch (error) {
                    console.error("Error in reloadUser:", error);
                    set({
                        user: null,
                        isLoading: false,
                        isLoggedIn: false
                    });
                }
            },

            logout: () => {
                set({
                    user: null,
                    isLoading: false,
                    isLoggedIn: false,
                    isInitialized: true
                });
            }
        }),
        {
            name: "user-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isLoggedIn: state.isLoggedIn
            }),
        }
    )
)


