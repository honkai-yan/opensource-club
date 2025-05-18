import { create } from "zustand";
import { User } from "./definition";
import { defaultUserdata } from "./data";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => {
  return {
    user: defaultUserdata,
    setUser: (user: User) => set({ user }),
  };
});
