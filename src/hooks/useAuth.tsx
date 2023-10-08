"use client";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";

import {useRouter} from "next/navigation";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {auth} from "@/firebase/init";
import AuthPage from "@/app/authentication/page";
import {useRecoilState} from "recoil";
import {errorState} from "@/atoms/loginErrorAtom";

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    loading: boolean;
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {
    },
    signIn: async () => {
    },
    logout: async () => {
    },
    error: null,
    loading: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);
    const [loginLoading, setLoginLoading] = useRecoilState(errorState)
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                router.push("/");
            } else {
                setUser(null);
                router.push("/login");
            }
            setLoading(false);
        });
    }, [auth]);

    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push("/");
                setLoading(false);
            })
            .catch((error) => {
                setLoginLoading(false)
                alert(error.message)
            }
    )
    .
        finally(() => setLoading(false));
    };

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push("/");
                setLoading(false);
            })
            .catch((error) => {
                setLoginLoading(false)
                alert(error.message);
            })
            .finally(() => setLoading(false));
    };

    const logout = async () => {
        setLoginLoading(false)
        signOut(auth)
            .then(() => {
                setUser(null);
                router.push("/login");
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const memoedValue = useMemo(
        () => ({
            user,
            signUp,
            signIn,
            loading,
            logout,
            error,
        }),
        [user, loading],
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {loading ? <AuthPage/> : children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
