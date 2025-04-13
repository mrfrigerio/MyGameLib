import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../service/api";

type SignInCredentials = { email: string; password: string };
type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    type: string;
    zip_code: string;
    neighborhood: string;
    number: string;
    complement: string;
  }[];
};
type updateCredentials = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  addresses?: {
    street: string;
    city: string;
    state: string;
    type: string;
    zip_code: string;
    neighborhood: string;
    number: string;
    complement: string;
  }[];
};

interface IAuthContext {
  user: User | undefined;
  isLogged: boolean;
  signIn: (credentials: SignInCredentials) => Promise<User | undefined>;
  signUp: (credentials: SignUpCredentials) => Promise<User | undefined>;
  updateUser: (user: updateCredentials) => Promise<User | undefined>;
  deleteUser: (userId: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = React.createContext({} as IAuthContext);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

// Utils para salvar e carregar em base64
const encode = (data: unknown) => btoa(JSON.stringify(data));
const decode = (encoded: string) => JSON.parse(atob(encoded));

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const isLogged = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("@mgl");
    if (storedUser) {
      try {
        const parsedUser = decode(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Erro ao decodificar usuário do localStorage", err);
        localStorage.removeItem("@mgl");
      }
    }
  }, []);

  async function signIn(credentials: SignInCredentials) {
    try {
      const response = await api.post<User>("/auth/login", credentials);
      const user = response.data;
      setUser(user);
      localStorage.setItem("@mgl", encode(user));
      return user;
    } catch (error) {
      toast.error("E-mail ou senha inválidos!");
    }
  }

  async function signUp(credentials: SignUpCredentials) {
    try {
      const response = await api.post<User>("/users", credentials);
      const user = response.data;
      setUser(user);
      localStorage.setItem("@mgl", encode(user));
      return user;
    } catch (error: any) {
      console.log(error);
      toast.error(
        `Falha no cadastro do usuário!\n${error?.response?.data?.message}`
      );
    }
  }

  async function updateUser(update: updateCredentials) {
    try {
      const response = await api.put<User>(`/users/${user?.id}`, update);
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem("@mgl", encode(updatedUser));
      toast.success("Usuário atualizado com sucesso!");
      return updatedUser;
    } catch (error) {
      toast.error("Falha na atualização do usuário!");
    }
  }

  async function deleteUser(userId: string) {
    try {
      await api.delete(`/users/${userId}`);
      localStorage.removeItem("@mgl");
      setUser(undefined);
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      toast.error("Falha na exclusão do usuário!");
    }
  }

  function signOut() {
    localStorage.removeItem("@mgl");
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        signIn,
        signUp,
        signOut,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);
