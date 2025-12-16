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
    rateMovie: (movieId: number, rating: number) => Promise<void>;
    toggleWatched: (movieId: number) => Promise<void>;
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

            rateMovie: async (movieId: number, rating: number) => {
                const user = get().user;
                if (!user) return;

                try {
                    const resp = await axiosPublic.post(`/ratings/${movieId}`,
                        { rating },
                        { withCredentials: true }
                    );

                    if (resp.data.success && resp.data.ratings) {
                        const updatedUser = {
                            ...user,
                            ratings: [...resp.data.ratings]
                        };
                        console.log('Rating updated:', updatedUser.ratings);
                        set({ user: updatedUser });
                    }
                } catch (error) {
                    console.error("Error rating movie:", error);
                }
            },

            toggleWatched: async (movieId: number) => {
                const user = get().user;
                if (!user) return;

                try {
                    const resp = await axiosPublic.post(`/watched/toggle/${movieId}`, {}, {
                        withCredentials: true,
                    });

                    if (resp.data.success && resp.data.watchedMovies) {
                        const updatedUser = {
                            ...user,
                            watchedMovies: [...resp.data.watchedMovies]
                        };
                        console.log('Watched movies updated:', updatedUser.watchedMovies);
                        set({ user: updatedUser });
                    }
                } catch (error) {
                    console.error("Error toggling watched status:", error);
                    // Fallback: Lokale Aktualisierung bei Fehler
                    const alreadyWatched = user?.watchedMovies?.includes(movieId);
                    const updatedWatched = alreadyWatched
                        ? user?.watchedMovies?.filter((id) => id !== movieId)
                        : [...(user?.watchedMovies || []), movieId];

                    const updatedUser = { ...user, watchedMovies: updatedWatched };
                    console.log('Watched movies updated (fallback):', updatedUser.watchedMovies);
                    set({ user: updatedUser });
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
                        const currentUser = get().user;
                        // Merge backend data with existing localStorage data
                        const userData = {
                            ...resp.data,
                            favorites: resp.data.favorites || currentUser?.favorites || [],
                            watchedMovies: resp.data.watchedMovies || currentUser?.watchedMovies || [],
                            ratings: resp.data.ratings || currentUser?.ratings || []
                        };
                        console.log('User loaded from backend:', userData);
                        set({
                            user: userData,
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
                    const resp = await axiosPublic.get("/auth/currentUser", {
                        withCredentials: true,
                    });


                    if (resp.data && resp.data._id) {
                        // Ensure arrays are initialized
                        const userData = {
                            ...resp.data,
                            favorites: resp.data.favorites || [],
                            watchedMovies: resp.data.watchedMovies || [],
                            ratings: resp.data.ratings || []
                        };
                        set({
                            user: userData,
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
                user: state.user ? {
                    ...state.user,
                    favorites: state.user.favorites || [],
                    watchedMovies: state.user.watchedMovies || [],
                    ratings: state.user.ratings || []
                } : null,
                isLoggedIn: state.isLoggedIn
            }),
        }
    )
)


