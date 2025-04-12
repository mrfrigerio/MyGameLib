import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../service/api";

type SignInCredentials = {
  email: string;
  password: string;
};
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
  signIn: (signInCredentials: SignInCredentials) => Promise<User | undefined>;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const isLogged = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("@mgl");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  async function signIn(signInCredentials: SignInCredentials) {
    try {
      const response = await api.post<User>("/auth/login", {
        email: signInCredentials.email,
        password: signInCredentials.password,
      });

      const user = response.data;
      setUser(user);

      localStorage.setItem("@mgl", JSON.stringify(user));
      return response.data;
    } catch (error) {
      toast.error("E-mail ou senha inválidos!");
    }
  }

  async function updateUser(updateCredentials: updateCredentials) {
    try {
      const response = await api.put<User>(`/users/${user?.id}`, {
        name: updateCredentials?.name,
        email: updateCredentials?.email,
        password: updateCredentials?.password,
        addresses: updateCredentials?.addresses,
      });

      const userData = response.data;
      setUser(userData);
      localStorage.setItem("@mgl", JSON.stringify(user));
      toast.success("Usuário atualizado com sucesso!");
      return response.data;
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

  async function signUp(signUpCredentials: SignUpCredentials) {
    try {
      const response = await api.post<User>("/users", {
        name: signUpCredentials.name,
        email: signUpCredentials.email,
        password: signUpCredentials.password,
        addresses: signUpCredentials.addresses,
      });
      const user = response.data;
      setUser(user);

      localStorage.setItem("@mgl", JSON.stringify(user));
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(
        `Falha no cadastro do usuário!\n${error?.response?.data?.message}`
      );
    }
  }

  async function signOut() {
    // Muito provavelmente o signOut não precisa ser async,
    // basta apagar o user que o app deve funcionar.
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
