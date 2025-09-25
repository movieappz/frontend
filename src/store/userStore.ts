import { create } from "zustand"
import type { IUserState } from "../interfaces/user/IUserInterface"
import axios from "axios"
import { AUTH_HEADER } from "../context/MainProvider";


export const useUserStore = create<IUserState>((set) => ({
    user: null,
    setUser: (u) => set({ user: u }),
    reloadUser: async () => {
        try {
            const resp = await axios.get("/me", { headers: AUTH_HEADER });
            if (resp.data !== null) {
                set({ user: resp.data })
            } else {
                set({ user: null })
            }
        } catch (error) {
            set({ user: null });
        }
    }
}))