"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/firebase/init";
import { toast } from "react-toastify";
import { FirebaseError } from "@firebase/util";
import AuthPage from "@/app/authentication/page";

type IAuth = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  authLoading: boolean;
};

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  authLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error] = useState(null);
  const loggedInOnce =
    typeof window !== "undefined" && localStorage.getItem("loggedInOnce");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (
          pathname !== "/home/tvshows" &&
          pathname !== "/home/movies" &&
          pathname !== "/home/mylist" &&
          pathname !== "/home/search"
        ) {
          loggedInOnce === "true" && router.push("/home");
        }
      } else {
        setUser(null);
        pathname !== "/signup" && router.push("/login");
      }
      setAuthLoading(false);
    });
    setTimeout(() => setAuthLoading(false), 5000);
  }, [authLoading, loggedInOnce, pathname, router]);

  const handleSignInError = () => {
    toast.error("Account doesn't exist, please sign up now.", {
      position: "bottom-center",
      pauseOnFocusLoss: false,
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: "",
      theme: "dark",
    });
  };
  const handleSignUpError = (err: FirebaseError) => {
    console.log(err.code);
    toast.error(
      err.code === "auth/invalid-email"
        ? "Please make sure that your email is valid."
        : err.code === "auth/weak-password"
          ? "Please make sure your password is over 6 characters."
          : err.code === "auth/email-already-in-use"
            ? "This email is already related to an account, please sign in."
            : "Try again later.",
      {
        position: "bottom-center",
        pauseOnFocusLoss: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: "",
        theme: "dark",
      },
    );
  };

  const signUp = async (email: string, password: string) => {
    setAuthLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/login");
      })
      .catch((err: FirebaseError) => {
        handleSignUpError(err);
      })
      .finally(() => setAuthLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/home");
        typeof window !== "undefined" &&
          localStorage.setItem("loggedInOnce", "true");
      })
      .catch(() => {
        handleSignInError();
      })
      .finally(() => setAuthLoading(false));
  };

  const logout = async () => {
    setAuthLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/login");
        typeof window !== "undefined" &&
          localStorage.setItem("loggedInOnce", "false");
      })
      .catch((error) => alert(error.message))
      .finally(() => setAuthLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        logout,
        authLoading,
        error,
      }}
    >
      {authLoading ? <AuthPage></AuthPage> : children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
