export interface IUser {
    id: string;
    username: string
    email: string;
    password: string;
    favorites: string[];
}

export interface IUserState {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    reloadUser: () => Promise<void>;
}