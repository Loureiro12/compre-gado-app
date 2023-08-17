import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {api} from "../services/api";
import Purchases from "react-native-purchases";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  token: string;
  user: object;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  location: string;
  created_at: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthProviderProps {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthProviderProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@melhoraMaisAp:token",
        "@melhoraMaisAp:user",
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadStorageData();
  }, []);

  const userStorageUseKey = "@melhoraMaisApp:use";
  const userStorageTokenKey = "@melhoraMaisApp:token";

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/login", {
      email,
      password,
    });

    const { access_token, user } = response.data;

    await Purchases.logIn(user.id);

    await AsyncStorage.setItem(userStorageTokenKey, access_token);
    await AsyncStorage.setItem(userStorageUseKey, JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${access_token}`;

    setUser(user);

    // setData({ access_token, user });
  }, []);

  async function signOut() {
    await Purchases.logOut();
    AsyncStorage.removeItem(userStorageUseKey);
    AsyncStorage.removeItem(userStorageTokenKey);

    setData({} as AuthState);
    setUser({} as User);
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await AsyncStorage.getItem(userStorageUseKey);
      const token = await AsyncStorage.getItem(userStorageTokenKey)

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
        setUserStorageLoading(false);
        api.defaults.headers.authorization = `Bearer ${token}`;
      } else {
        signOut();
      }
    }
    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };