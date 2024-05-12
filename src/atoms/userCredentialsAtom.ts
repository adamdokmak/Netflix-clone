import { atom } from "recoil";

export const userCredentialsAtom = atom({
  key: "userCredentialsAtom",
  default: { email: "", password: "" },
});
