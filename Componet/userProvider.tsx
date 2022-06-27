import { Auth } from "aws-amplify";
import { createContext, useContext, useEffect, useState } from "react";
import { CognitoUser } from "@aws-amplify/auth";

// export const UserContext = createContext(null);

export function useUsercontext() {
  return useContext(UserContext);
}

export interface UserAttributes {
  email: string;
  name: string;
  picture: string;
}

interface CognitoUserExt extends CognitoUser {
  attributes: UserAttributes;
}

export const UserContext = createContext<
  | {
      initializing: boolean;
      user: CognitoUserExt | null;
    }
  | undefined
>(undefined);

export function useAuth() {
  const auth = useContext(UserContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return auth;
}

export function UserProvider({ children }: any) {
  const [user, setuser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((userData) => {
        setuser(userData);
        setInitializing(false);
      })
      .catch(() => {
        console.log("Not signed in");
        setInitializing(false);
      });
  }, []);

  const value = {
    user,
    initializing,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
