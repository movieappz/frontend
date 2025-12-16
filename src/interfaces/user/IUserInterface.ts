export interface IUser {
    id: string;
    username: string
    email: string;
    password: string;
    favorites: number[];
    watchedMovies: number[];
    ratings: Array<{
        movieId: number;
        rating: number;
        createdAt: string;
    }>;
    createdAt: string;
}

export interface IUserState {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    reloadUser: () => Promise<void>;
}