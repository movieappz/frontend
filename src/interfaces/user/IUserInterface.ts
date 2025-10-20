export interface IUser {
    id: string;
    username: string
    email: string;
    password: string;
    favorites: number[];
}

export interface IUserState {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    reloadUser: () => Promise<void>;
}