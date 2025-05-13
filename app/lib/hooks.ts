import { create } from "zustand";
import { defaultUserdata } from "./data";
import { User } from "../lib/definition";

export function useUesrdataStore() {
  return create<{
    userdata: User;
  }>((set) => ({
    userdata: defaultUserdata,
    setUserdata: (userdata: User) => set(() => ({ userdata })),
  }));
}
