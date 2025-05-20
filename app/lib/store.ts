import { create } from "zustand";
import { User } from "./definition";
import { defaultUserdata } from "./data";
import { getLocalStorage } from "./utils/utils.common";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => {
  return {
    user: getLocalStorage<User>("user_base_info") || defaultUserdata,
    setUser: (user: User) => set({ user }),
  };
});
